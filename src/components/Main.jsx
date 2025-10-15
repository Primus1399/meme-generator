import { useEffect, useState } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    imageURL: "http://i.imgflip.com/1bij.jpg",
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
  });

  const [memeArr, setMemeArr] = useState([]);

  const handleChange = (event) => {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => {
      return { ...prevMeme, [name]: value };
    });
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemeArr(data.data.memes));
  }, []);

  const generateImage = () => {
    const randomNumber = Math.floor(Math.random() * memeArr.length);
    const randomImage = memeArr[randomNumber];
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        imageURL: randomImage.url,
      };
    });
  };
  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
          />
        </label>
        <button onClick={generateImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageURL} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
