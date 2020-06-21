window.onload = () => {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js'
  document.body.appendChild(script)
  script.onload = () => {
    // hide loader
    setTimeout(() => {
      const loader = document.getElementsByClassName('loader-wrapper')[0]
      loader.className = 'loader__disappear'

      /* ------------- Intro Js ------------- */
      const heading_text_wrapper = document.getElementsByClassName('into-headings-wrapper')[0]
      const heading_text_list = Array.from(heading_text_wrapper.children)

      renderHeadings = (isResized = false) => {
        let HEADING_MAX_WIDTH = 500
        if (window.innerWidth > 500 && window.innerWidth <= 600) {
          HEADING_MAX_WIDTH = 420
        }
        if (window.innerWidth < 500) {
          HEADING_MAX_WIDTH = 310
        }
        heading_text_wrapper.style.width = `${HEADING_MAX_WIDTH}px`
        heading_text_wrapper.style.borderBottomColor = 'red'
        heading_text_wrapper.style.borderBottomStyle = 'solid'

        heading_text_list.map((heading, idx) => {
          heading.style.width = `${HEADING_MAX_WIDTH}px`
        })
        // 1st text render
        const FIRST_TIMER = isResized ? 0 : 1000
        const SECOND_TIMER = isResized ? 0 : 2000
        const THIRD_TIMER = isResized ? 0 : 3000
        setTimeout(() => {
          let ele = heading_text_list[0]
          let value = 3.5
          if (window.innerWidth < 600) {
            value = 2.5
          }
          ele.style.transform = `translateY(-${value}rem)`
        }, FIRST_TIMER)

        // 2nd text render
        setTimeout(() => {
          let ele = heading_text_list[1]
          ele.style.opacity = '1'
        }, SECOND_TIMER)

        // 3rd text render
        setTimeout(() => {
          let ele = heading_text_list[2]
          let value = 4.2
          if (window.innerWidth < 600) {
            value = 3
          }
          ele.style.transform = `translateY(${value}rem)`
          ele.style.width = `${HEADING_MAX_WIDTH}px`
          ele.style.opacity = '1'
        }, THIRD_TIMER)
      }
      renderHeadings()
      window.onresize = _.debounce(() => renderHeadings(true), 500, { trailing: true })
      /* ------------- END - Intro Js ------------- */

      /* ------------- Navigation JS ------------- */
      const nav_Top_btn = document.getElementsByClassName('nav-up-arrow')[0]
      const nav_Down_btn = document.getElementsByClassName('nav-down-arrow')[0]
      const nav_item_divs = document.getElementsByClassName('nav-item')
      const header_items_divs = document.getElementsByClassName('header-items')
      const root_container = document.getElementById('root')

      const NAV_LIST_LENGTH = 4
      const ROOT_CONTAINER_HEIGHT = root_container.clientHeight
      const HEADERS_ITEM_SCROLL_VALUE = 35
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
        if (scrolled_Via_Btn) {
          window.btnSrollTrigger = setInterval(() => {
            const root_pos_top = root_container.getBoundingClientRect().top
            let activeElePos_top = activeSection.getBoundingClientRect().top
            let lowVal = Math.floor(activeElePos_top)
            let highVal = Math.ceil(activeElePos_top)
            if (lowVal === root_pos_top || highVal === root_pos_top) {
              scrolled_Via_Btn = false
              clearInterval(window.btnSrollTrigger)
              window.btnSrollTrigger = undefined
            }
          }, 100)
        }
      }

      updateNavHeader = () => {
        const ele = document.getElementsByClassName('header-items')[0]
        ele.style.transform = `translateY(-${HEADERS_ITEM_SCROLL_VALUE * active_NavItem_Index}px)`
        ele.style.transition = `all 0.5s ease-in-out 0s`
      }

      root_container.addEventListener('scroll', _.throttle((event) => {
        scroll_position_value = (event.srcElement.children[0].getBoundingClientRect()).top
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
      /* ------------- END - Navigation JS ------------- */


      /* ------------- Action btns ------------- */
      const getInTouch_btn = document.getElementById('getIn-touch-btn')
      getInTouch_btn.onclick = () => {
        console.log('clicked')
        const contactme_section = document.getElementById('contact-me-section')
        Array.from(nav_item_divs).map(item => {
          item.className = 'nav-item'
        })
        active_NavItem_Index = 4
        contactme_section.scrollIntoView()
        scrolled_Via_Btn = true
        displayActiveSection()
        updateNavHeader()
      }

      const gitHub_viewMore_btn = document.getElementById('viewMore-github-btn')
      gitHub_viewMore_btn.onclick = () => {
        window.open('https://github.com/DeepakC27')
      }
      // mailOpt-btn
      // resumeOpt-btn

    }, 1000)
  }
}
