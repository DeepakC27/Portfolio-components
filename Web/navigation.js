const nav_Top_btn = document.getElementsByClassName('nav-up-arrow')[0]
const nav_Down_btn = document.getElementsByClassName('nav-down-arrow')[0]
const nav_item_divs = document.getElementsByClassName('nav-item')
const header_items_divs = document.getElementsByClassName('header-items')
const root_container = document.getElementById('root')

const NAV_LIST_LENGTH = 4
const ROOT_CONTAINER_HEIGHT = root_container.clientHeight
const HEADERS_ITEM_SCROLL_VALUE = 28
let scroll_position_value = 0
let scrolled_Via_Btn
let active_NavItem_Index = 0

nav_Top_btn.onclick = () => {
  scrolled_Via_Btn = true
  scrollingVerticalTabs(-1)
}
nav_Down_btn.onclick = () => {
  scrolled_Via_Btn = true
  scrollingVerticalTabs(1)
}

scrollingVerticalTabs = (direction) => {
  let oldActiveEle
  Array.from(nav_item_divs).map((navItem, index) => {
    if (navItem.className.includes('nav-item--active')) {
      active_NavItem_Index = index
      oldActiveEle = navItem
    }
  })

  if (direction === 1) {
    // down arrow click
    if (active_NavItem_Index === (nav_item_divs.length - 1)) {
      // reset to top val
      active_NavItem_Index = 0
    } else {
      ++active_NavItem_Index
    }
  } else {
    // top arrow click
    if (active_NavItem_Index === 0) {
      // reset to bottom val
      active_NavItem_Index = (nav_item_divs.length - 1)
    } else {
      --active_NavItem_Index
    }
  }
  displayActiveSection()
  updateNavHeader()
  oldActiveEle.className = 'nav-item bg_black'
}

displayActiveSection = () => {
  const activeIdx = active_NavItem_Index
  nav_item_divs[activeIdx].className += ' nav-item--active'
  const activeSection = document.getElementById(nav_item_divs[activeIdx].ariaLabel)
  activeSection && activeSection.scrollIntoView()
  // to avoid window scroll getting triggered
  setTimeout(() => {
    scrolled_Via_Btn = false
  }, 2000)
}

updateNavHeader = () => {
  const ele = document.getElementsByClassName('header-items')[0]
  ele.style.transform = `translateY(-${HEADERS_ITEM_SCROLL_VALUE * active_NavItem_Index}px)`
  ele.style.transition = `all 0.5s ease-in-out 0s`
}

// Need to be optimized
/*
root_container.addEventListener('scroll', _.throttle((event) => {
  !scrolled_Via_Btn && updateHeaderViaScroll(event)
}), 1000, { trailing: true })

updateHeaderViaScroll = (event) => {
  let sectionList = Array.from(root_container.getElementsByTagName('section'))
  sectionList.map((section, indx) => {
    let position = section.getBoundingClientRect()
    if(position.top > 0 && position.top < ROOT_CONTAINER_HEIGHT/1.5 && position.bottom >= 0) {
      if (indx !== active_NavItem_Index) {
        scrollingVerticalTabs(getScrolldirection(event))
      }
    }
  })
}

getScrolldirection = (evt) => {
  let dir = ((evt.srcElement.children[0].getBoundingClientRect()).top > scroll_position_value
    ? 1
    : -1
  )
  scroll_position_value = (evt.srcElement.children[0].getBoundingClientRect()).top
  return dir
}
*/
