export function fadeOut(element){
  window.setTimeout(function(){
    element.current.classList.add("fadeOut");
  }, 2000);
}

export function timedFunc(delay, funcToDo){
  window.setTimeout(function(){
    funcToDo();
  }, delay);
}
