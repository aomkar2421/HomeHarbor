import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
  
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const inputs = Object.fromEntries(formData);
  
      try {
        const res = await apiRequest.post("/posts", {
          postData: {
            title: inputs.title,
            price: parseInt(inputs.price),
            address: inputs.address,
            city: inputs.city,
            bedroom: parseInt(inputs.bedroom),
            bathroom: parseInt(inputs.bathroom),
            type: inputs.type,
            property: inputs.property,
            latitude: inputs.latitude,
            longitude: inputs.longitude,
            images: images,
          },
          postDetail: {
            desc: value,
            utilities: inputs.utilities,
            pet: inputs.pet,
            income: inputs.income,
            size: parseInt(inputs.size),
            school: parseInt(inputs.school),
            bus: parseInt(inputs.bus),
            restaurant: parseInt(inputs.restaurant),
          },
        });
        navigate("/"+res.data.id)
      } catch (err) {
        console.log(err);
        setError(error);
      }
    };
  
    return (
      <div className="newPostPage">
        <div className="formContainer">
          <h1>Add New Post</h1>
          <div className="wrapper">
            <form onSubmit={handleSubmit}>
              <div className="item">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" />
              </div>
              <div className="item">
                <label htmlFor="price">Price</label>
                <input id="price" name="price"  value={15000} type="number" />
              </div>
              <div className="item">
                <label htmlFor="address">Address</label>
                <input id="address" name="address" type="text" />
              </div>
              <div className="item description">
                <label htmlFor="desc">Description</label>
                <ReactQuill theme="snow" onChange={setValue} value={value} />
              </div>
              <div className="item">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" />
              </div>
              <div className="item">
                <label htmlFor="bedroom">Bedroom Number</label>
                <input min={1} id="bedroom" value={3} name="bedroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="bathroom">Bathroom Number</label>
                <input min={1} id="bathroom" value={1} name="bathroom" type="number" />
              </div>
              <div className="item">
                <label htmlFor="latitude">Latitude</label>
                <input id="latitude" name="latitude" type="text" />
              </div>
              <div className="item">
                <label htmlFor="longitude">Longitude</label>
                <input id="longitude" name="longitude" type="text" />
              </div>
              <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
              <div className="item">
                <label htmlFor="type">AC Rooms</label>
                <select name="property">
                  <option value="apartment">Available</option>
                  <option value="house">Not avialable</option>
                </select>
              </div>
  
              <div className="item">
                <label htmlFor="utilities">Parking</label>
                <select name="utilities">
                  <option value="owner">Available</option>
                  <option value="tenant">Not avialable</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="pet">Available For</label>
                <select name="pet">
                  <option value="girls">Girls</option>
                  <option value="boys">Boys</option>
                  <option value="girlsboys">Girls & Boys</option>
                </select>
              </div>
              <div className="item">
                <label htmlFor="income">Deposit</label>
                <input
                  id="income"
                  name="income"
                  type="text"
                  placeholder="Deposit"
                  value={10000}
                />
              </div>
              <div className="item">
                <label htmlFor="size">Maintainance</label>
                <input min={0} id="size" name="size"  value={1000} type="number" />
              </div>
              <div className="item">
                <label htmlFor="school">School</label>
                <input min={0} id="school" name="school" value={300} type="number" />
              </div>
              <div className="item">
                <label htmlFor="bus">bus</label>
                <input min={0} id="bus" name="bus" value={400} type="number" />
              </div>
              <div className="item">
                <label htmlFor="restaurant">Restaurant</label>
                <input min={0} id="restaurant" name="restaurant" value={200} type="number" />
              </div>
              <button className="sendButton">Add</button>
              {error && <span>error</span>}
            </form>
          </div>
        </div>
        <div className="sideContainer">
          {images.map((image, index) => (
            <img src={image} key={index} alt="" /> 
          ))}
          <UploadWidget
            uwConfig={{
              multiple: true,
              cloudName: "dlaf451ax",
              uploadPreset: "estate",
              folder: "posts",
            }}
            setState={setImages}
          />
        </div>
      </div>
    );
}

export default NewPostPage