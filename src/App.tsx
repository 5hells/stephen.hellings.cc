import './App.scss'
import { createSignal } from 'solid-js'

function interactiveScroller() {
  const [scrolling, setScrolling] = createSignal(false)
  const [scrollStart, setScrollStart] = createSignal({ x: 0, y: 0 })
  const [scrollPos, setScrollPos] = createSignal({ x: 0, y: 0 })

  const itemWidth = 300
  const centerX = window.innerWidth / 2
  const elements = [
    "s",
    "t",
    "e",
    "p",
    "h",
    "e",
    "n",
    "e",
    "d",
    "m",
    "u",
    "n",
    "d",
    "h",
    "e",
    "l",
    "l",
    "i",
    "n",
    "g",
    "s"
  ]


  const maxScrollX = (elements.length - 1) * itemWidth - window.innerWidth + itemWidth

  const onMouseDown = (e: MouseEvent) => {
    setScrolling(true)
    setScrollStart({ x: e.clientX, y: e.clientY })
  }

  const onMouseMove = (e: MouseEvent) => {
    if (scrolling()) {
      const deltaX = scrollStart().x - e.clientX
      const deltaY = scrollStart().y - e.clientY
      let newX = scrollPos().x + deltaX
      let newY = scrollPos().y + deltaY
      newX = Math.max(0, Math.min(newX, maxScrollX))
      newY = Math.max(0, Math.min(newY, 0))
      setScrollPos({ x: newX, y: newY })
      setScrollStart({ x: e.clientX, y: e.clientY })
    }
  }

  const onMouseUp = () => {
    setScrolling(false)
  }

  const fonts = ["Arial", "Verdana", "Helvetica", "Georgia", "Courier New"];


  return (
    <div class="scroller" onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      {elements.map((text, index) => {
        const x = index * itemWidth - scrollPos().x
        const distance = Math.abs(x - centerX)
        const scale = 0.3 + 0.7 / (1 + distance / 200)
        const waveY = Math.sin((x + scrollPos().x) / 100) * 20
        const font = fonts[index % fonts.length]
        return <div class="item" style={{
          transform: `translate(${x}px, ${waveY}px) scale(${scale * 20})`,
          color: '#fff',
          "font-family": font,
          "user-select": 'none',
        }} >{text}</div>
      })}
    </div>
  )
}

function App() {
  const messedupFontRef = (el: HTMLHeadingElement) => {
    if (el) {
      const fonts = ["Arial", "Verdana", "Helvetica", "Georgia", "Courier New"];
      const chars = el.innerText.split('')
      el.innerHTML = ''
      chars.forEach((char, index) => {
        const span = document.createElement('span')
        span.innerText = char
        span.style.display = 'inline-block'
        span.style.whiteSpace = 'pre'
        span.style.fontFamily = fonts[index % fonts.length]
        span.style.transform = `rotate(${Math.random() * 20 - 10}deg)`
        span.style.transition = 'transform 0.1s'
        span.addEventListener('mouseover', () => {
          span.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1.2)`
        })
        span.addEventListener('mouseout', () => {
          span.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1)`
        })
        el.appendChild(span)
      })
    }
  }

  const [md, setMd] = createSignal<boolean>(false);

  const cursorTracker = (el: HTMLDivElement) => {
    if (el) {
      document.addEventListener('mousemove', (e) => {
        if (md() === true) return;
        el.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
      })
      document.addEventListener('mousedown', (e) => {
        if (e.button === 0) { 
          setMd(true);
          el.style.width = '100vw'
          el.style.height = '100vh'
          el.style.top = '0'
          el.style.left = '0'
          el.style.transform = 'translate(0, 0)'
          el.style.transition = 'transform 0.1s, background 0.3s, width 0.3s, height 0.3s, top 0.3s, left 0.3s'
          el.style.borderRadius = '0'
          el.style.pointerEvents = 'none'
        }
      })
    }
  }

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        "background-color": '#000',
        overflow: 'hidden',
      }}>
        <div align="center" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white;">
          {interactiveScroller()}
          <a href="https://github.com/5hells" target="_blank"><h1 style="transform: translateY(-30vh); color: white;" ref={messedupFontRef}>i develop software that you may like</h1></a>
        </div>

        <div ref={cursorTracker} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          "background-color": 'black',
          "border-radius": '50%',
          width: '50vw',
          height: '50vw',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s, background 0.3s',
          "mix-blend-mode": 'difference',
          filter: 'invert(1)',
          zIndex: 100000
        }}></div>
      </div>
    </>
  )
}

export default App
