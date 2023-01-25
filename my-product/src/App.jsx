import { useEffect, useState } from 'react';
import './App.css';
import firebaseService from './firebase/firebaseService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [multi_image, setMulti_image] = useState("");
  const [single_image, setSingle_image] = useState("");

  const [singleImage, setSingleImage] = useState([]);
  const [multiImage, setMultiImage] = useState([]);



  const multi_upload = async () => {
    const res = await firebaseService.multi_image_upload(multi_image)
    if (res.error) {
      toast(res.error)

    } else {
      toast(res.sucess)
    }
  }

  const single_upload = async () => {
    const res = await firebaseService.single_image_upload(single_image)
    if (res.error) {
      toast(res.error)

    } else {
      toast(res.sucess)
      get_single_image()
    }
  }

// ajouter des images dans notre base de donnees
  const get_multi_image = async () => {
    const res = firebaseService.get_multi_image();
    setMultiImage(res)



  }
  const get_single_image = async () => {
    const res = await firebaseService.get_single_image()
    setSingleImage(res)

  }

  useEffect(
    () => {
      get_multi_image();
      get_single_image();
    }, []
  )

  // fonction supprime une image
  const delete_single_image = async (img) => {
    const res = await firebaseService.delete_single_image(img)
    if (res.error) {
      toast(res.error)
    } else {
      toast(res.sucess)
      get_single_image();
    }
  }


// fonction supprime plusieurs image
  const delete_multi_image = async (img) => {
    const res = await firebaseService.delete_multi_image(img)
    if (res.error) {
      toast(res.error)
    } else {
      toast(res.sucess)
      get_multi_image();
    }
  }


  return (
    <div className="App">
      <ToastContainer />
      <div className="image_upload">

        <div className="image_upload_muli">
          <input multiple onChange={(e) => setMulti_image(e.target.files)} required type="file" />

          <button onClick={multi_upload}>Multi uplaod</button>
        </div>
        <div className="image_upload_single">
          <input onChange={(e) => setSingle_image(e.target.files[0])} type="file" />

          <button onClick={single_upload}>Single uplaod</button>
        </div>

      </div>
      <h2>Muti Image</h2>
      <div className="multi">
        {
          multiImage.length > 0 && multiImage.map((m, i) => <div>
            <h2> farid {m.image.length}</h2>
            <div className='multi_image'>
              {
                m.image.map(img => <img src={img.src} alt=''/>)
              }
            </div>
            <button onClick={() => delete_multi_image(m)}> Delete Image</button>
          </div>)
        }
      </div>
      <h2>Single Image</h2>
      <div className='single_image'>
        {
          singleImage.length > 0 && singleImage.map((v, i) => <div className='card'>
            <img src={v.image} alt="" />

            <div>
              <button onClick={() => delete_single_image(v)}>Delete</button>
            </div>
          </div>)
        }
      </div>
    </div>
  );
}

export default App;
