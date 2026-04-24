import React from "react";
import { render } from "../dist/bundle";

function App() {
  const [position, setPosition] = React.useState([0, 0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPosition(position => {
        const x = position[0];
        const y = position[1];

        return [x + 1, y + 1];
      });
    }, 10)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return <rect x={position[0]} y={position[1]} w={100} h={100}/>
}

render(<App />)
