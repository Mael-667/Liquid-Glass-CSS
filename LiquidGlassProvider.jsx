/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useInsertionEffect, useRef } from "react";

export const LiquidGlassContext = createContext({
      balises: [],
      backgrounds: []
    });

export function LiquidGlassProvider({children}){
    useInsertionEffect(() => {
        let css = `.liquidGlass,.liquidGlass::after,.liquidGlass::before{transform:translate3d(0,0,0);border-radius:.9rem;top:0}.liquidGlass{position:relative;z-index:10;width:fit-content;color:#fff;font-size:1.1em;text-shadow:0 0 4px #000}.liquidGlass::after,.liquidGlass::before{pointer-events:none;position:absolute;height:100%;width:100%}.liquidGlass>*{position:relative;z-index:12}.liquidGlass::after{content:"";display:block;z-index:11;box-shadow:inset 1px 1px 6px -2px rgb(255 255 255 / 87%),inset -1px -2px 3px 1px rgb(49 49 49 / 30%),0 0 6px 1px rgb(0 0 0 / 38%);background:rgb(255 255 255 / 3%)}.liquidGlass::before{content:"";display:block;z-index:9;filter:url(#liquidGlassFilter2);backdrop-filter:blur(3px)}.glassLightMode{color:#000;font-size:1em;text-shadow:none}.glassLightMode::after{box-shadow:1px 2px 4px -2px rgb(0 0 0 / 27%),inset 2px 3px 5px 0 rgb(255 255 255 / 28%);background-color:#00000009}.liquidGlassLarge,.liquidGlassLarge::after,.liquidGlassLarge::before{transform:translate3d(0,0,0);border-radius:3rem;top:0}.liquidGlassLarge{position:relative;z-index:10;width:fit-content;color:#fff;font-size:1.1em;text-shadow:0 0 4px #000}.liquidGlassLarge::after,.liquidGlassLarge::before{pointer-events:none;position:absolute;height:100%;width:100%}.liquidGlassLarge>*{position:relative;z-index:12}.liquidGlassLarge::before{content:"";display:block;z-index:9;filter:url(#liquidGlassFilter);backdrop-filter:blur(3px)}.liquidGlassLarge::after{content:"";display:block;z-index:11;background:rgb(255 255 255 / 3%);box-shadow:inset 1px 1px 3px 1px rgb(255 255 255 / 38%),inset -1px -2px 3px 1px rgb(49 49 49 / 30%),0 0 7px 1px rgb(0 0 0 / 46%)}.liquidBtn{background:#ffffff36;border:1px solid #ffffff78;backdrop-filter:blur(3px);color:#fff;text-shadow:0 0 7px #000;padding:.5rem;font-size:1.1rem;border-radius:.5rem;transition:150ms}.liquidBtn:hover{background:#ffffff59}.dynamic::after{background:var(--background)!important;box-shadow:var(--shadow)!important}.dynamic:hover::after{background:var(--backgroundHover)!important}.blur-0::before{backdrop-filter:blur(0)}.blur-1::before{backdrop-filter:blur(1px)}.blur-2::before{backdrop-filter:blur(2px)}.blur-3::before{backdrop-filter:blur(3px)}.blur-4::before{backdrop-filter:blur(4px)}.blur-5::before{backdrop-filter:blur(5px)}.blur-6::before{backdrop-filter:blur(6px)}.blur-7::before{backdrop-filter:blur(7px)}.blur-8::before{backdrop-filter:blur(8px)}.blur-9::before{backdrop-filter:blur(9px)}.blur-10::before{backdrop-filter:blur(10px)}`;
        let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
        svg.setAttribute("height", "0");
        svg.setAttribute("width", "0");
        svg.setAttribute("display", "none");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.innerHTML = `
        <defs>
            <filter id="liquidGlassFilter" color-interpolation-filters="sRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
                    <feTurbulence type="fractalNoise" baseFrequency="0.009 0.011" numOctaves="2" seed="8" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"/>
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="55" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" result="displacementMap1"/>
            </filter>
            <filter id="liquidGlassFilter2" color-interpolation-filters="linearRGB" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
                <feBlend mode="screen" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="SourceGraphic" result="blend"/>
                <feTurbulence type="fractalNoise" baseFrequency="0.009 0.008" numOctaves="2" seed="8" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"/>
                <feDisplacementMap in="blend" in2="turbulence" scale="55" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" result="displacementMap1"/>
            </filter>
        </defs>`;
        document.querySelector("head").appendChild(svg);
        let style = document.createElement("style");
        style.innerText = css;
        document.querySelector("head").prepend(style);

        return () => {
          svg.remove();
          style.remove();
        }
    })

    useDynamicHue();

    const context = useContext(LiquidGlassContext);

    return <LiquidGlassContext.Provider value={context}>
              {children}
           </LiquidGlassContext.Provider>
}



//crée un composant au nom dynamique via la variable component qu'on associe au parametre "as"
// eslint-disable-next-line no-unused-vars
export function LiquidGlass({as: Component = 'div', children, className = '', hoverable = false, dynamic = false, large = false ,...props}){

  const ref = useRef(null);
  const lqContext = useContext(LiquidGlassContext);
  
  useEffect(() => {
    if(!dynamic) return;
    
    let entry = { element: ref, hoverable: hoverable };
    lqContext.balises.push(entry);

    return () => {
      const index = lqContext.balises.indexOf(entry);
      if (index > -1) lqContext.balises.splice(index, 1);
    }
  }, [dynamic, hoverable, lqContext.balises])

  return (
    // eslint-disable-next-line react-hooks/immutability
    <Component className={`${large ? "liquidGlassLarge" : "liquidGlass"} ${className}`} {...props} ref={(el) => {ref.current = el; if(props.ref) props.ref.current = el;}}>
      {children}
    </Component>
  );
}

// eslint-disable-next-line no-unused-vars
export function Tint({as: Component = 'div', children, hue, ...props}){

  const ref = useRef(null);
  const lqContext = useContext(LiquidGlassContext);
  
  useEffect(() => {
    let entry = { element: ref, shade: hue};
    lqContext.backgrounds.push(entry);

    return () => {
      const index = lqContext.backgrounds.indexOf(entry);
      if (index > -1) lqContext.backgrounds.splice(index, 1);
    }
  }, [lqContext.backgrounds, hue])

  return (
    // eslint-disable-next-line react-hooks/immutability
    <Component {...props} ref={(el) => {ref.current = el; if(props.ref) props.ref.current = el;}}>
      {children}
    </Component>
  );
}



function useDynamicHue() {

  const lqContext = useContext(LiquidGlassContext);
  
  useEffect(() => {
    let backgrounds = lqContext.backgrounds;
    let elmnts = lqContext.balises;

    let wait = false;
    let DynamicHue = () => {
      if (!wait) {
        wait = true;
        let selected = [];
        for (let i = 0; i < backgrounds.length; ++i) {
          let color = backgrounds[i].shade;
          for (let j = 0; j < elmnts.length; j++) {
            if(elmnts[j].element.current === null || backgrounds[i].element.current === null) continue;
            if (isTargetInElement(elmnts[j].element.current, backgrounds[i].element.current)) {
              elmnts[j].element.current.classList.add("dynamic");
              elmnts[j].element.current.style.setProperty('--background', `${colorAdjust(color, -0.2)}32`);
              elmnts[j].element.current.style.setProperty('--shadow', `inset 1px 1px 3px 1px ${colorAdjust(color, 0.2)}47, inset -1px -2px 3px 1px rgb(49 49 49 / 30%), 0px 0px 7px 1px rgb(0 0 0 / 41%)`);
              if (elmnts[j].hoverable) {
                elmnts[j].element.current.style.setProperty('--backgroundHover', `${colorAdjust(color, -0.1)}50`);
              }
              selected.push(j);
            };
          };
        };
        for (let i = 0; i < elmnts.length; ++i) {
          let notinbg = true;
          for (let j = 0; j < selected.length; j++) {
            if (i == selected[j]) {
              notinbg = false;
            };
          };
          if (notinbg) {
            if(elmnts[i].element.current == null) continue;
            elmnts[i].element.current.classList.remove("dynamic");
            elmnts[i].element.current.style.setProperty('--background', "");
            elmnts[i].element.current.style.setProperty('--shadow', ``);
            elmnts[i].element.current.style.setProperty('--backgroundHover', ``);
          };
        };
        setTimeout(function () {
          wait = false;
        }, 70);
      }
    }

    document.addEventListener("scroll", DynamicHue, { passive: true });

    return () => {
      document.removeEventListener("scroll", DynamicHue)
    }
  }, [lqContext.backgrounds, lqContext.balises])
};


function colorAdjust(color, brigthness) {
  let r, g, b;
  if (color[0] == "#") {
    r = Number(`0x${color.substring(1, 3)}`);
    g = Number(`0x${color.substring(3, 5)}`);
    b = Number(`0x${color.substring(5, 7)}`);
  }
  let brigthnessCorrection = Math.floor(brigthness * 255 / 1);

  r += brigthnessCorrection;
  g += brigthnessCorrection;
  b += brigthnessCorrection;

  r = r < 0 ? "00" : r > 255 ? "ff" : r < 16 ? `0${r.toString(16)}` : r.toString(16);
  g = g < 0 ? "00" : g > 255 ? "ff" : g < 16 ? `0${g.toString(16)}` : g.toString(16);
  b = b < 0 ? "00" : b > 255 ? "ff" : b < 16 ? `0${b.toString(16)}` : b.toString(16);

  return `#${r}${g}${b}`
}

function isTargetInElement(target, element) {
  let coTarget = target.getBoundingClientRect();
  let coElement = element.getBoundingClientRect();
  if (!(coTarget.top >= coElement.top)) {
    return false;
  }
  if (!(coTarget.bottom <= coElement.bottom)) {
    return false;
  }
  if (!(coTarget.left >= coElement.left)) {
    return false;
  }
  if (!(coTarget.right <= coElement.right)) {
    return false;
  }
  return true;
}