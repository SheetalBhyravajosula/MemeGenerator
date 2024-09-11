import { useEffect, useState } from "react";
import "../App.css";

export default function Content() {
  var [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  var [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      const result = await fetch("https://api.imgflip.com/get_memes");
      const data = await result.json();
      setAllMemes(data?.data?.memes)
    }
    getMemes();
  }, []);

  function getMeme() {
    let randomNumber = Math.floor(Math.random() * allMemes?.length);
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: allMemes[randomNumber]?.url,
      };
    });
  };

  function handleChange(event) {
    let { name, value } = event.target;
    setMeme((oldMeme) => ({
      ...oldMeme,
      [name]: value
    }))
  }

  return (
    <div className="content">
      <div className="input-form">
        <label htmlFor="topText" className="input-label">
          Top Text
        </label>
        <label htmlFor="bottomText" className="input-label">
          Bottom Text
        </label>
        <input
          id="topText"
          className="input-label input-type"
          type="text"
          placeholder="Enter top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        ></input>
        <input
          id="bottomText"
          className="input-label input-type"
          type="text"
          placeholder="Enter bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        ></input>
        <button className="submit-button" onClick={getMeme}>
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}
