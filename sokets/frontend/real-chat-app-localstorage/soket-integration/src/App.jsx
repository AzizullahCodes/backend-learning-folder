import ScreenOne from "./ScreenOne";
import ScreenTwo from "./ScreenTwo";
import ScreenThree from "./ScreenThree";

const App = () => (
  <div style={{ display: "flex", gap: 16, padding: 16 }}>
    <ScreenOne />
    <ScreenTwo />
    <ScreenThree />
  </div>
);

export default App;