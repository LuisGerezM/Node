import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateBlog } from "./components/CreateBlog";
import { EditBlog } from "./components/EditBlogs";
import { ShowBlogs } from "./components/ShowBlogs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowBlogs />} />
          <Route path="/create" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
