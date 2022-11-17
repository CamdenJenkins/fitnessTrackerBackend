import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editActivity } from "../api/activities";

export default function EditActivity() {
  const navigate = useNavigate();

  const { activityId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log({ name, description });
          const result = await editActivity(name, description, activityId);
          console.log(result);
          navigate("/activities");
        }}
      >
        <h3>Edit the Activity</h3>
        <label>Exercise: </label>
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>

        <label>Description: </label>
        <input
          value={description}
          type="text"
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
