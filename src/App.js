import "./App.css";
import Header from "./components/Header.jsx";
import Upload from "./components/Upload";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container main-content">
        <Upload />
      </div>
      <Footer />
    </div>
  );
}


export default App;
