#!/bin/bash

# Constants
TEMP_DIR="temp"
OUTPUT_DIR="dist"
MANIFEST_DIR="manifest"
ICONS_DIR="icons"
CERTS_DIR="certs"

getExtVersion() {
	if [ ! -f "package.json" ]; then
		echo "[[ERROR] package.json not found." >&2
		return 1
	fi

	if ! command -v jq &>/dev/null; then
		echo -e "[ERROR] jq is not installed" >&2
		return 1
	fi

	if jq -e '.version' package.json >/dev/null; then
		jq -r '.version' package.json
	else
		echo "[ERROR] 'version' key not found in package.json" >&2
		return 1
	fi

}

cleanBuildFolder() {
	if [ -d "temp/" ]; then
		echo "[INFO] Cleaning temporary build folders"
		rm -rf temp/
	fi
}

prepareBuildFolder() {
	echo "[INFO] Preparing temporary build folder"
	mkdir -p "temp/"
	cp -r assets/icons temp/icons
	rm temp/icons/icon.svg
	pnpm exec rollup -c
}

build_manifest() {
	local browser="$1"

	echo -e "[INFO] Building $browser manifest"

	if ! jq -s '.[0] * .[1]' "$MANIFEST_DIR/${browser}-manifest.json" "$MANIFEST_DIR/manifest.json" >"$TEMP_DIR/manifest.json"; then
		echo -e "[ERROR] Failed to build $browser manifest" >&2
		return 1
	fi
}

build_crx() {
	local version="$1"

	build_manifest "chrome" "$version" || return 1

	echo -e "[INFO] Packaging Chromium extension ($version)"

	if ! command -v chromium &>/dev/null; then
		echo -e "[ERROR] Chromium browser is not installed" >&2
		return 1
	fi

	local crx_key="$CERTS_DIR/crx_sign.pem"
	if [ ! -f "$crx_key" ]; then
		echo -e "[ERROR] Chromium extension signing key not found at $crx_key" >&2
		return 1
	fi

	chromium --pack-extension="$TEMP_DIR/" --pack-extension-key="$crx_key"
	mv "$TEMP_DIR.crx" "$OUTPUT_DIR/yt-pb-calc-v${version}.signed.crx"

	echo -e "[INFO] Chromium extension built successfully!"
}

build_zip() {
	local version="$1"

	echo "[INFO] Packaging Firefox extension version ($version)"

	build_manifest "firefox" "$version" || return 1

	pnpm exec web-ext build --source-dir=temp/ --artifacts-dir=dist/ --filename="yt-pb-calc-v${version}.xpi" --overwrite-dest

	echo -e "[INFO] Firfox extension built successfully!"
}

buildExtension() {
	local version
	version=$(getExtVersion)

	cleanBuildFolder
	prepareBuildFolder

	build_crx "$version"
	build_zip "$version"

	echo "[INFO] Build completed for both Firefox and Chrome"

	cleanBuildFolder
}

buildExtension
