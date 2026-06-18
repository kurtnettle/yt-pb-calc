import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    srcDir: 'src',
    modules: ['@wxt-dev/auto-icons'],
    webExt: {
        binaries: {
            chrome: '/usr/bin/brave',
            firefox: '/usr/lib/firefox-developer-edition/firefox',
        },
    },
    manifest: {
        name: "YT Playback Calculator",
        short_name: "yt-pb-calc",
        homepage_url: 'https://github.com/kurtnettle/bjobs-enhancer',
        browser_specific_settings: {
            gecko: {
                id: '{9025100f-9751-4986-925e-0f47733a4cc5}',
                data_collection_permissions: {
                    required: ['none'],
                },
            },
        },
    }
});
