import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

const Profile = () => {
  const [user, setUser] = useState([]);
  const [headers, setHeaders] = useState();
const [cookie, setCookie, removeCookie] = useCookies(["token"],{token:null});
  console.log(useCookies(["token"]));
  useEffect(() => {
    if (cookie.token !== undefined) {
      setUser(true);
    }else{
      setUser(false);
    }
  },[]);
  useEffect(() => {
    setHeaders({'token': cookie.token})
    axios
      .get(`http://localhost:5000/user`
      ,{
        headers:headers
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // handle image uploading
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // const [oldPassword, setOldPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(e.target.files[0]);
    if (file) {
      setPhotoName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPhoto = () => {
    // Trigger file input click using useRef
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  // end handle image uploading

  // handle changes made
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if(!error){
      const updatedUser = {};
      updatedUser.id = user.user_id;
      if (user.first_name !== "") {
        updatedUser.first_name = user.first_name;
      }

      if (user.last_name !== "") {
        updatedUser.last_name = user.last_name;
      }

      if (user.email !== "") {
        updatedUser.email = user.email;
      }

      if (user.phone !== "") {
        updatedUser.phone = user.phone;
      }
      // if(oldPassword !== '' && newPassword !== '' && confirmPassword !== ''){
      //   if(oldPassword === user.password){
      //     if(newPassword === confirmPassword){
      //       updatedUser.password = newPassword;
      //     }else{
      //       setError("Password doesn't match");
      //     }
      //   }else{
      //     setError("The password you've entered doesn't match the old password");
      //   }
      // }

      updatedUser.profile_image_name = imageFile;
      console.log(updatedUser);
      try {
        const response = await axios.put(
          `http://localhost:5000/updateuser`,
          updatedUser,{
            headers:headers
          }
        );
        console.log(response.data);
      } catch (error) {
        alert("Error updating Information");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-2/3 bg-[#0d79635c] my-6 md:ml-24 px-10 py-5 rounded-lg">
          <form action="post">
            <div className="flex flex-col md:flex-row flex-wrap justify-around">
              <div>
                {/* image uploading section */}
                <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <div className="text-center">
                    <div className="mt-2">
                      <span
                        className="block w-40 h-40 rounded-full m-auto shadow"
                        style={{
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                          backgroundImage: `url('${
                            photoPreview !== null
                              ? photoPreview
                              : "https://i.pinimg.com/originals/c0/c2/16/c0c216b3743c6cb9fd67ab7df6b2c330.jpg"
                          }')`,
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover-text-gray-500 focus-outline-none focus-border-blue-400 focus-shadow-outline-blue active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                      onClick={handleSelectPhoto}
                    >
                      Select New Photo
                    </button>
                  </div>
                </div>
              </div>
              {/* end of image uploading section */}
              <div className="flex flex-col justify-around w-full xl:w-2/3">
                <div></div>
                <label for="first_name" className=" self-start p-2">
                  First Name
                </label>
                <input
                  className="w-full mb-3 p-2 border rounded-md"
                  // value={user.first_name}
                  onChange={(e) => (user.first_name = e.target.value)}
                  placeholder={user.first_name}
                  type="text"
                  name="first_name"
                />
                <label for="last_name" className=" self-start p-2">
                  Last Name
                </label>
                <input
                  className="w-full mb-3 p-2 border rounded-md"
                  // value={user.last_name}
                  onChange={(e) => (user.last_name = e.target.value)}
                  placeholder={user.last_name}
                  type="text"
                  name="last_name"
                />
              </div>
            </div>
            <div className="flex flex-col justify-start mt-2">
              <label for="first_name" className=" self-start p-2">
                Email
              </label>
              <input
                className="w-full p-2 border rounded-md"
                // value={user.email}
                onChange={(e) => (user.email = e.target.value)}
                placeholder={user.email}
                type="email"
                name="email"
              />
            </div>

            <div className="mb-3">
              <div className="flex flex-col justify-start mt-2">
                <label for="first_name" className=" self-start p-2">
                  Phone
                </label>
                <input
                  className="w-full p-2 border rounded-md"
                  // value={user.phone}
                  onChange={(e) => (user.phone = e.target.value)}
                  type="tel"
                  id="phone"
                  name="phone"
                  //   pattern="[0-9]{2}-[0-9]{3}-[0-9]{4}"
                  placeholder={user.phone}
                  //   title="Phone number must be in the format 12-345-6789"
                />
              </div>
              {/* <div className="flex flex-col justify-start mt-2">
                <label for="first_name" className=" self-start p-2">
                  Change Password
                </label>
                <input
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Old Password"
                  type="password"
                />
                <input
                  className="w-full p-2 border rounded-md mt-2"
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  type="password"
                />
                <input
                  className="w-full p-2 border rounded-md mt-2"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  type="password"
                />
              </div> */}
            </div>
            <div className="flex justify-end">
              <button
                className="w-1/4 mr-3 p-2 bg-gray-50 text-black rounded-xl mt-2 "
                type="clear"
                // onClick={hendleSignUp}
              >
                Cancel
              </button>
              <button
                className="w-auto py-2 px-3 bg-teal-600 text-white rounded-xl mt-2 "
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>

            {error && (
              <p className="text-red-600 mt-2">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;