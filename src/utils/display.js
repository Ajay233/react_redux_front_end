export function fadeOut(element){
  window.setTimeout(function(){
    element.current.classList.add("fadeOut");
  }, 2000);
}

export function timedFunc(delay, element, funcToDo){
  window.setTimeout(function(){
    element.current.classList.add("shrinkNotification")
    window.setTimeout(function(){
      funcToDo();
    }, 487);
  }, delay);
}
