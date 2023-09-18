import { D_PANEL_MENU_ITEMS, D_SPEED_SLIDER } from './css_selectors.js';

/**
 * get the playback back menu item from the settings panel.
 * @return {Element} playback menu item.
 */
export function getDesktopPlayBackItem () {
  const MenuItems = document.querySelectorAll(D_PANEL_MENU_ITEMS);
  for (const MenuItem of MenuItems) {
    const item = MenuItem.children;
    if (item[1].textContent.includes('speed')) return MenuItem;
  }
  throw new ReferenceError('[yt-pb-calc] [desktop] - failed to find playback item.');
}

/**
 * get the desktop playback speed value.
 * @return {string} playback speed text.
 */
export function getDesktopPlayBackSpeed () {
  const MenuItem = getDesktopPlayBackItem();
  return MenuItem.children[2].textContent.toLocaleLowerCase();
}

/**
 * get the custom playback speed value.
 * @return {null|string} custom speed
 */
export function getDesktopCustomPlayBackSpeed () {
  let customSpeed = document.querySelector(D_SPEED_SLIDER);
  if (customSpeed) {
    customSpeed = customSpeed.getAttribute('aria-valuetext');
    if (customSpeed == '1') customSpeed = 'normal';
    return customSpeed;
  }
  return null;
}
