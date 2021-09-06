import { useRef, useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/client";

const ProfileForm = () => {
  const [session] = useSession();

  const profilePictureRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();

  const [msg, setMsg] = useState("");
  const [isMessageAvail, setIsMessageAvail] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsError(false);
      setIsMessageAvail(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isError, isMessageAvail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("bio", bioRef.current.value);
      formData.append("userId", session.user.userId);
      if (profilePictureRef.current.files[0]) {
        formData.append("profilePicture", profilePictureRef.current.files[0]);
      }
      fetch("/api/user", {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.response !== "1") {
            setIsError(true);
            setMsg("Profile not updated");
          } else {
            setIsMessageAvail(true);
            setIsError(false);
            setMsg("Profile updated");
            getSession();
          }
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMsg("Profile not updated");
      setLoading(false);
    }
  };

  return (
    <form className="mt-2 w-full flex flex-col items-center">
      {(isError || isMessageAvail) && (
        <div
          className={`bg-transparent ${
            !isError ? "text-green-500" : "text-red-500"
          } text-sm font-bold py-2 px-4 flex justify-center items-center mb-4`}
        >
          <p>{msg}</p>
        </div>
      )}
      <div className="w-3/4">
        <div className="flex items-center flex-wrap">
          <label
            htmlFor="avatar"
            className="custom_file_upload bg-green-800 text-sm text-white px-3 py-2 rounded-full cursor-pointer"
          >
            Choose Profile Picture
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/png, image/jpeg"
              ref={profilePictureRef}
            />
          </label>
          <p className="ml-3 text-black-100 text-sm">
            You've chosen:{" "}
            <span className="text-green-700">
              {profilePictureRef?.current?.files[0]?.name.length > 0
                ? profilePictureRef.current.files[0].name
                : "nothing yet..."}
            </span>
          </p>
        </div>
        <div className="profileUpdateFormCont mt-6">
          <label className="profileUpdateLabel">Name</label>
          <div className="breaker"></div>
          <input
            id="name"
            autoComplete="false"
            tabIndex="0"
            type="text"
            placeholder="Your name"
            className="profileUpdateInput"
            ref={nameRef}
          />
        </div>
        <div className="profileUpdateFormCont mt-4">
          <label className="profileUpdateLabel">Bio</label>
          <div className="breaker"></div>
          <input
            id="bio"
            autoComplete="false"
            tabIndex="0"
            type="text"
            placeholder="Something about you"
            className="profileUpdateInput"
            ref={bioRef}
          />
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            className={`bg-green-800 px-4 py-1 text-white rounded-full ${
              loading && "bg-green-600 disabled:cursor-not-allowed "
            }`}
            onClick={(e) => handleSubmit(e)}
            disabled={loading ? true : false}
          >
            {loading ? "Submitting" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
