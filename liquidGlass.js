//injects the svg filter which allows the background to be deformed when the page is loaded then injects the css
document.addEventListener("DOMContentLoaded", function(){

    //liquid glass css rules to inject
    let css = `.liquidGlass,.liquidGlass::after,.liquidGlass::before{transform:translate3d(0,0,0);border-radius:.9rem;top:0}.liquidGlass{position:relative;z-index:10;width:fit-content;color:#fff;font-size:1.1em;text-shadow:0 0 4px #000}.liquidGlass::after,.liquidGlass::before{pointer-events:none;position:absolute;height:100%;width:100%}.liquidGlass>*{position:relative;z-index:12}.liquidGlass::after{content:"";display:block;z-index:11;box-shadow:inset 1px 1px 2px 0 rgb(255 255 255 / 87%),inset -1px -2px 3px 1px rgb(49 49 49 / 30%),0 0 6px 1px rgb(0 0 0 / 38%);background:rgb(255 255 255 / 3%)}.liquidGlass::before{content:"";display:block;z-index:9;filter:url(#liquidGlassFilter2);backdrop-filter:blur(3px)}.glassLightMode{color:#000;font-size:1em;text-shadow:none}.glassLightMode::after{box-shadow:1px 2px 4px -2px rgb(0 0 0 / 27%),inset 2px 3px 5px 0 rgb(255 255 255 / 28%);background-color:#00000009}.liquidGlassLarge,.liquidGlassLarge::after,.liquidGlassLarge::before{transform:translate3d(0,0,0);border-radius:3rem;top:0}.liquidGlassLarge{position:relative;z-index:10;width:fit-content;color:#fff;font-size:1.1em;text-shadow:0 0 4px #000}.liquidGlassLarge::after,.liquidGlassLarge::before{pointer-events:none;position:absolute;height:100%;width:100%}.liquidGlassLarge>*{position:relative;z-index:12}.liquidGlassLarge::before{content:"";display:block;z-index:9;filter:url(#liquidGlassFilter);backdrop-filter:blur(3px)}.liquidGlassLarge::after{content:"";display:block;z-index:11;background:rgb(255 255 255 / 3%);box-shadow:inset 1px 1px 3px 1px rgb(255 255 255 / 38%),inset -1px -2px 3px 1px rgb(49 49 49 / 30%),0 0 7px 1px rgb(0 0 0 / 46%)}.liquidBtn{background:#ffffff36;border:1px solid #ffffff78;backdrop-filter:blur(3px);color:#fff;text-shadow:0 0 7px #000;padding:.5rem;font-size:1.1rem;border-radius:.5rem;transition:150ms}.liquidBtn:hover{background:#ffffff59}.dynamic::after{background:var(--background)!important;box-shadow:var(--shadow)!important}.dynamic:hover::after{background:var(--backgroundHover)!important}.blur-0::before{backdrop-filter:blur(0)}.blur-1::before{backdrop-filter:blur(1px)}.blur-2::before{backdrop-filter:blur(2px)}.blur-3::before{backdrop-filter:blur(3px)}.blur-4::before{backdrop-filter:blur(4px)}.blur-5::before{backdrop-filter:blur(5px)}.blur-6::before{backdrop-filter:blur(6px)}.blur-7::before{backdrop-filter:blur(7px)}.blur-8::before{backdrop-filter:blur(8px)}.blur-9::before{backdrop-filter:blur(9px)}.blur-10::before{backdrop-filter:blur(10px)}`;
    
    let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    svg.setAttribute("height", "0");
    svg.setAttribute("width", "0");
    svg.setAttribute("display", "block");
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
    document.querySelector("body").appendChild(svg);
    let style = document.createElement("style");
    style.innerText = css;
    document.querySelector("head").prepend(style);

    
    //activate dynamic hues only if needed
    if(document.querySelector("[data-hue]") != null){
        dynamicLiquidGlassColor();
    };
});

//add "data-hue:#hexcolor" to an element so that its color permeates liquidglasses with a parent element with the class dynamicColor that hover over it
function dynamicLiquidGlassColor(){
    let backgrounds = document.querySelectorAll("[data-hue]");
    let parents = document.querySelectorAll(".dynamicHue");
    let parentsHoverable = document.querySelectorAll(".dynamicHueHvr");
    let elmnts = [];
    for(parent of parents){ 
        for(enfant of parent.querySelectorAll(".liquidGlass")){
            elmnts.push({element: enfant, hoverable: false});
        };
    };
    for(parent of parentsHoverable){ 
        for(enfant of parent.querySelectorAll(".liquidGlass")){
            elmnts.push({element: enfant, hoverable: true});
        };
    };

    //for each liquidglass element with a parent class dynamicColor, the function will check if its displayed within an element with an hue. If so, it will apply the filter and mark it as selected.
    //the unselected elements at the end of the loop, therefore those which are not at all on a background, will have their leftover hue removed
    addEvt(document, "scroll", function(){
        let selected = [];

        for(let i = 0; i < backgrounds.length; ++i){
            let color = backgrounds[i].getAttribute("data-hue");
            for(let j = 0; j < elmnts.length; j++){
                if(isTargetInElement(elmnts[j].element, backgrounds[i])){
                    elmnts[j].element.classList.add("dynamic");
                    elmnts[j].element.style.setProperty('--background', `${colorAdjust(color, -0.2)}32`);
                    elmnts[j].element.style.setProperty('--shadow', `inset 1px 1px 3px 1px ${colorAdjust(color, 0.2)}47, inset -1px -2px 3px 1px rgb(49 49 49 / 30%), 0px 0px 7px 1px rgb(0 0 0 / 41%)`);
                    if(elmnts[j].hoverable){
                        elmnts[j].element.style.setProperty('--backgroundHover', `${colorAdjust(color, -0.1)}50`);
                    }
                    selected.push(j);
                };
            };
        };
        for(let i = 0; i < elmnts.length; ++i){
            let euh = true;
            for(let j = 0; j < selected.length; j++){
                if(i == selected[j]){
                    euh = false;
                };
            };
            if(euh){
                elmnts[i].element.classList.remove("dynamic");
                elmnts[i].element.style.setProperty('--background', "");
                elmnts[i].element.style.setProperty('--shadow', ``);
                elmnts[i].element.style.setProperty('--backgroundHover', ``);
            };
        };
    });
};


function isTargetInElement(target, element){
    let coTarget = target.getBoundingClientRect();
    let coElement = element.getBoundingClientRect();
    if(!(coTarget.top >= coElement.top)){
        return false;
    }
    if(!(coTarget.bottom <= coElement.bottom)){
        return false;
    }
    if(!(coTarget.left >= coElement.left)){
        return false;
    }
    if(!(coTarget.right <= coElement.right)){
        return false;
    }
    return true;
}

//the brigthness adjustement parameter range from -1 to 1
function colorAdjust(color, brigthness){
    let r, g, b;
    if(color[0] == "#"){
        r = Number(`0x${color.substring(1, 3)}`);
        g = Number(`0x${color.substring(3, 5)}`);
        b = Number(`0x${color.substring(5, 7)}`);
    }
    let brigthnessCorrection = Math.floor(brigthness*255/1);

    r+=brigthnessCorrection;
    g+=brigthnessCorrection;
    b+=brigthnessCorrection;
    
    r = r < 0 ? "00" : r > 255 ? "ff" : r < 16 ? `0${r.toString(16)}` : r.toString(16);
    g = g < 0 ? "00" : g > 255 ? "ff" : g < 16 ? `0${g.toString(16)}` : g.toString(16);
    b = b < 0 ? "00" : b > 255 ? "ff" : b < 16 ? `0${b.toString(16)}` : b.toString(16);
    
    return `#${r}${g}${b}`
}