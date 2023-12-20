import React from "react";

function MyButton({ title }: { title: string }): React.JSX.Element {
  return <button>{title}</button>;
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app!</h1>
      <MyButton title="I'm a button" />
    </div>
  );
}
