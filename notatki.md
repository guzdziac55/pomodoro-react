<!--  info

// make form working - just open form with submit and confirm habdler
// state on it with task update

 <!-- variables in css modules use to theme
 https://github.com/css-modules/css-modules/blob/master/docs/values-variables.md -->

<!--  ważne state to jest to co się zmienia - co jest ruchome
taskLista po dodaniu edycji i usunieciu
TimeRunning ( false / true )   when timer is running or no // toggle this when button start clicked/
// currentTime też w state == >   odpala dispatch Update(active.id) (get fromtasklist..item.active i dodaj mu pomodoro + 1  //)
// ctx.update będzie odpalone w momencie kiedy currentTime = 0 // current time musi byc w state bo jest ReRender timera cały czas


 -->

<!--  // PUT TXT ADD EDIT DALATE INTO OBJECT WITH ACTIONS -->
 <!-- ADD ACTIVE ON CLICK SET ACTIVE INTO TASKS   DONE BUT FIX E TARGET  -->

<!-- // FIX BUTTON SHOW HIDE FORM -->
<!-- CHECK METHOD WITH RERENDERING TASKLIST  => TASKiTEM OR TASKFORM IF TASKITEM IS ON EDIT -->

<!-- https://www.freecodecamp.org/news/why-you-should-choose-usestate-instead-of-usereducer-ffc80057f815/

 -->

 <!--  add dynamic checking input TaskName coś jak w tutorialu 
 // sprawdza czy trim().length > 0 jeśli tak to zmienia state valid na true jeśli nie to false.

 // następnie button confirm zmienia styl i możliwośc kliknięcia // lub zmienia cała klase
  -->

<!--  FORM EDIT DZIAŁA NA ZASADZIE TEGO SAMEGO FORMA -->
<!-- PRZYCISK DELATE JEST UKRYTY !  -->

<!-- conditional classes
<div className={`${classes.Content} ${props.collapse ? classes.collapse : ''}`}> -->

<!-- CONTROLLED FORM WITH ON CHANGE -->
<!-- https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js
 -->
 <!-- https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js -->

<!-- creating dropdown menu
https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks -->
