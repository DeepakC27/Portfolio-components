const initialize = () => {
  /* ------- Global Var ------- */
    const RESUME_LINK = 'https://drive.google.com/file/d/1AkVAGWqSflKR3Rkixk6j_YM5Bc-btEbt/view?usp=sharing'
    const GITHUB = 'https://github.com/DeepakC27'
    const MAIL_LINK = 'mailto:chaudharideepak10@hotmail.com'
  /* ------- END - Global Var ------- */

  setTimeout(() => {
    // hide loader
    const loader = document.getElementsByClassName('loader-wrapper')[0]
    loader.className = 'loader__disappear'

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

          // to be updated with IntersectionObserver
          if (scrolled_Via_Btn) {
            const activeSection = document.getElementById(nav_item_divs[active_NavItem_Index].ariaLabel)
            activeSection && activeSection.scrollIntoView()
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

    const root_observer_options = {
      rootMargin: '-50% 0% -50% 0%'
    }

    const root_observer = new IntersectionObserver((entries, root_observer) => {
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
    }, root_observer_options)

    sectionsList.forEach(section => {
      root_observer.observe(section)
    })

    const fadeIn_elements = root_container.querySelectorAll('.fade-in')
    const slideIn_elements = root_container.querySelectorAll('.slide-in')
    const displayOnScroll = new IntersectionObserver((entries, displayOnScroll) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return
        } else {
          entry.target.classList.add('appear')
          displayOnScroll.unobserve(entry.target)
        }
      })
    }, {
      // threshold: .5,
      rootMargin: '0px 0px -100px 0px'
    })

    fadeIn_elements.forEach(ele => {
      displayOnScroll.observe(ele)
    })
    slideIn_elements.forEach(ele => {
      displayOnScroll.observe(ele)
    })
    /* ------------- END - Navigation JS ------------- */


    /* ------------- Action btns ------------- */
    const eyeBalls = document.querySelectorAll('.eyeball')
    document.onmousemove = (event) => {
      const posX = event.clientX * 100 / window.innerWidth + '%'
      const posY = event.clientY * 100 / window.innerHeight + '%'
      eyeBalls.forEach(eyeball => {
        eyeball.style.left = posX
        eyeball.style.top = posY
        eyeball.style.transform = `translate(-${posX}, -${posY})`
      })
    }

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

    const mailTo_Btn = document.getElementById('mailOpt-btn')
    mailTo_Btn.onclick = () => {
      window.location = MAIL_LINK
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
  }, 1000)
}

window.onload = () => {
  let script = document.createElement('script')
  // script.type = 'text/javascript'
  // script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js'
  // document.body.appendChild(script)
  // script.onload = () => {
  //   initialize()
  // }
  initialize()
}
