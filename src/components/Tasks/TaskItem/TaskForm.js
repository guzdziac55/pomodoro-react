import React from "react";
import classes from "./TaskForm.module.css";
import Input from "../../UI/Input";
import Card from "../../UI/Card";

const TaskForm = (props) => {
  //  add on submit handler
  return (
    <Card class={classes.form}>
      <form>
        <Input
          // label={"what are u doing ?"}
          input={{
            id: "amount_" + props.id,
            type: "text",
            placeholder: "what are u doing ?",
          }}
        />
        <label> to jest labelka </label>
        {/*  add specjal component inputNumber with buttons + - or arrow up down */}
        <Input
          // label={"what are u doing ?"}
          input={{
            id: "amount_" + props.id,
            type: "number",
            placeholder: "what are u doing ?",
          }}
        />
      </form>
    </Card>
  );
};

export default TaskForm;
