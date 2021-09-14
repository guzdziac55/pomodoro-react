<!--  info



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





<!--  FORM EDIT DZIAŁA NA ZASADZIE TEGO SAMEGO FORMA -->
<!-- PRZYCISK DELATE JEST UKRYTY !    chuj wie jak to bedzie działać z reusem wyjdzie w praniu -->

<!-- conditional classes
<div className={`${classes.Content} ${props.collapse ? classes.collapse : ''}`}> -->

<!-- CONTROLLED FORM WITH ON CHANGE -->
<!-- https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js
 -->
 <!-- https://stackoverflow.com/questions/41488715/how-to-disable-button-in-react-js -->

<!-- creating dropdown menu
https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks -->

<!--  use effect wyjaśnienie:
https://pl.reactjs.org/docs/hooks-effect.html -->

<!--  w PRZYSZŁOŚCI -->
<!-- ZMIENIC FORM NA CONTROLLED COMPONENT ZE INPUT STATEM WEW KAŻDEGO INPUTA I DODATKOWO  ONCHANGE WHEN TYPING IN INPUT
-->

<!-- WAŻNE TYPOWO POMODOROR : POMYSŁY
<!-- fORM eDIT:  Po kliknięciu []icon  get ID => ReRender
task list ( dać mu on Edit albo porównać z id) -->
<!--  zamiast Item zrobić render Form i wrzucić wszystkie propsy z klikniętego -->
<!-- poxniej w providerze zrobić GetIndex i TaskItem(index) podmienić dane.
Albo cały obiekt  // to po naciśnieciu SAVE. -->

<!-- //  przy używaaniu jednego forma trzeba sprawdzić czy to edit czy newTask
albo w fromComponent sprawdzić czy ma id, albo czy state jest OnEdit OnNew - cos podobnego -->

<!-- wtedy submit wywoła funckje submit ale sprawdzi czy zrobić dispatch ADD czy EDIT -->

<!-- //ZMIANA EDIT WPAOWANIE DO TASKITEM
PROSTA FUNKCJA TOGGLE SPRAWDZI CZY TO ZADZIAŁA
CTX CONTEXT PROVIDER TYLKO ZAMIENI SUBMITA -->

<!-- --------------------------------------------------------------- -->
<!-- --------------------------------------------------------------- -->
<!-- --------------------------------------------------------------- -->
<!-- TIMETABS: DAĆ W PROPSACH DANE, PO KLIKNIĘCIU NA TABiTEM (ONCLICK) ZABRAĆ Z PROPA DANE I WRZUCIĆ DO CONTEXTU JAKO CURRENT TIMER. tYLKO JEŚLI TIMER IS STOP -->

  <!-- // const showIds = () => {
  //   console.log(props.id);
  // };

  // CTX.EDITtASKITEM <== DOKONCZYC
  // put values into taskForm

  // showIds(); -->

<!-- // TO DO  WOTREK  -->

<!--  MODIFY CARD TO BETTER GRAY BOTTOM VIEW  -->
<!-- OUTSIDE CLICK HANDLER FORM -->
<!-- ZACZAĆ DZIAŁAĆ Z INNYMI KOMPONENTAMI -->

<!--  NP COUNDOWN TIMER BOTTOM MOZNA ZROBIĆ ZA POMOCĄ USE EFFECT ?  -->
<!--  TABS TIMER - SPRAWDZIĆ MOMENT JS CZY WARTO CZY ROBIC BEZ BIBLIO -->
