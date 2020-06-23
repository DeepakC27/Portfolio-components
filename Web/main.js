window.onload = () => {
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js'
  document.body.appendChild(script)
  script.onload = () => {
    /* ------- Global Var ------- */
      const RESUME_LINK = 'https://drive.google.com/file/d/1AkVAGWqSflKR3Rkixk6j_YM5Bc-btEbt/view?usp=sharing'
      const GITHUB = 'https://github.com/DeepakC27'
    /* ------- END - Global Var ------- */

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
        // heading_text_wrapper.style.borderBottomColor = 'red'
        // heading_text_wrapper.style.borderBottomStyle = 'solid'

        heading_text_list.map((heading, idx) => {
          heading.style.width = `${HEADING_MAX_WIDTH}px`
        })
        // 1st text render
        const FIRST_TIMER = isResized ? 0 : 500
        const SECOND_TIMER = isResized ? 0 : 1500
        const THIRD_TIMER = isResized ? 0 : 2000
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
      const nav_Top_btn = document.querySelector('.nav-up-arrow')
      const nav_Down_btn = document.querySelector('.nav-down-arrow')
      const nav_item_divs = document.querySelectorAll('.nav-item')
      const root_container = document.getElementById('root')
      const sectionsList = root_container.querySelectorAll('section')

      const NAV_LIST_LENGTH = 4
      const ROOT_CONTAINER_HEIGHT = root_container.clientHeight
      const HEADERS_ITEM_SCROLL_VALUE = 35
      let scroll_position_value = 0
      let scrolled_Via_Btn
      let active_NavItem_Index = 0

      nav_Top_btn.onclick = () => {
        scrolled_Via_Btn = true
        setActiveSectionIdx(-1)
      }
      nav_Down_btn.onclick = () => {
        scrolled_Via_Btn = true
        setActiveSectionIdx(1)
      }

      setActiveSectionIdx = (direction) => {
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
      }

      displayActiveSection = () => {
        updateNavHeader()
        nav_item_divs.forEach((navItem, index) => {
          if (active_NavItem_Index === index) {
            navItem.className += ' nav-item--active'
            const activeSection = document.getElementById(nav_item_divs[active_NavItem_Index].ariaLabel)
            activeSection && activeSection.scrollIntoView()

            // to be updated with IntersectionObserver
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
          } else {
            navItem.className = 'nav-item bg_black'
          }
        })
      }

      updateNavHeader = () => {
        const ele = document.getElementsByClassName('header-items')[0]
        ele.style.transform = `translateY(-${HEADERS_ITEM_SCROLL_VALUE * active_NavItem_Index}px)`
        ele.style.transition = `all 0.5s ease-in-out 0s`
      }

      const options = {
        rootMargin: '-50% 0% -50% 0%'
      }

      const callback = (entries, observes) => {
        entries.forEach(entry => {
          let ele = entry.target
          if (!entry.isIntersecting) {
            return
          } else {
            sectionsList.forEach((section, idx) => {
              if (scrolled_Via_Btn) {
                return
              }
              if (section.id === ele.id) {
                active_NavItem_Index = idx
                displayActiveSection()
              }
            })
          }
        })
      }
      const root_observer = new IntersectionObserver(callback, options)
      sectionsList.forEach(section => {
        root_observer.observe(section)
      })


      /* ------------- END - Navigation JS ------------- */


      /* ------------- Action btns ------------- */
      const getInTouch_btn = document.getElementById('getIn-touch-btn')
      getInTouch_btn.onclick = () => {
        Array.from(nav_item_divs).map(item => {
          item.className = 'nav-item'
        })
        active_NavItem_Index = 4
        scrolled_Via_Btn = true
        displayActiveSection()
      }

      const gitHub_viewMore_btn = document.getElementById('viewMore-github-btn')
      gitHub_viewMore_btn.onclick = () => {
        window.open(GITHUB)
      }

      const viewResume_btn = document.getElementById('resumeOpt-btn')
      viewResume_btn.onclick = () => {
        window.open(RESUME_LINK)
      }

      const changeTheme_btn = document.getElementById('change-theme-btn')
      changeTheme_btn.onclick = () => {
        if (document.body.className.includes('dark-mode')) {
          document.body.classList.remove('dark-mode')
          changeTheme_btn.innerText = 'Dark Mode'
        } else {
          document.body.classList.add('dark-mode')
          changeTheme_btn.innerText = 'Light Mode'
        }
      }
      // mailOpt-btn

    }, 1000)
  }
}
