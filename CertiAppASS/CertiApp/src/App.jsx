import { useState } from 'react'
import React from 'react'
import { ethers } from 'ethers'
import ABI from './assets/CertiApp.json'
import address from './assets/deployed_addresses.json'


const App = () => {

  const [fromData, setformData] = useState({
    id: 0,
    name: '',
    course: '',
    grade: '',
    date: ''
  })
  const [Output, SetOutput] = useState('')
  function handleChange(event) {
    console.log(event.target)
    const { name, value } = event.target;
    console.log(name);
    setformData((preState) => ({ ...preState, [name]: value }))
    console.log(fromData);

  }
  async function connectMetemask() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer.address);
    alert(`${signer.address} is successfully logged in`)

  }
  async function handleSubmit(event) {
    event.preventDefault()
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const cAbi = ABI.abi;
    const cAddress = address['CertiAppModule#CertiApp'];
    console.log(cAddress);
    const certiInstance = new ethers.Contract(cAddress, cAbi, signer)
    console.log(certiInstance);
    const txnRecepit = await certiInstance.setCertificate(
      fromData.id,
      fromData.name,
      fromData.course,
      fromData.grade,
      fromData.date
    )
    console.log(txnRecepit);

  }
  async function getCertificate() {

    const id = document.getElementById('ID').value
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer);
    const cAbi = ABI.abi;
    const cAddress = address['CertiAppModule#CertiApp'];
    console.log(cAddress);
    const certiInstance = new ethers.Contract(cAddress, cAbi, signer)
    const txtvalue = await certiInstance.certificates(id)
    console.log(txtvalue[0]);
    SetOutput(`Name:${txtvalue[0]},Course:${txtvalue[1]},Grade:${txtvalue[2]},Date:${txtvalue[3]}`)

  }

  return (
    <>

      <div>App</div>
      <div>
        <button onClick={connectMetemask} className='border-2 border-black bg-yellow-400 w-52 h-12 hover:bg-yellow-500 rounded-md'>
          Connect Metamask</button>
      </div>
      <div>

          <div className="flex justify-center items-center bg-gray-200 m-5 p-8 w-[500px] h-[500px] ml-[380px]">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <label className="text-xl m-2" htmlFor="id">Id</label>
                <input
                  type="number"
                  name="id"
                  id="id"
                  onChange={handleChange}
                  className="border-2 border-black w-full p-2"
                />
              </div>

              <div className="mb-4">
                <label className="text-xl m-2" htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  className="border-2 border-black w-full p-2"
                />
              </div>

              <div className="mb-4">
                <label className="text-xl m-2" htmlFor="course">Course</label>
                <input
                  type="text"
                  name="course"
                  id="course"
                  onChange={handleChange}
                  className="border-2 border-black w-full p-2"
                />
              </div>

              <div className="mb-4">
                <label className="text-xl m-2" htmlFor="grade">Grade</label>
                <input
                  type="text"
                  name="grade"
                  id="grade"
                  onChange={handleChange}
                  className="border-2 border-black w-full p-2"
                />
              </div>

              <div className="mb-4">
                <label className="text-xl m-2" htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={handleChange}
                  className="border-2 border-black w-full p-2"
                />
              </div>

              <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        <div>
          <div className="flex justify-center items-center p-8 rounded-md shadow-lg w-96">
            <div className="mb-4">
              <input
                type="text"
                name="ID"
                id="ID"
                placeholder="Enter your ID"
                className="border-2 border-black w-full p-2 rounded-md"
              />
            </div>
            <button
              onClick={getCertificate}
              className="bg-blue-500  m-5 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full">
              Get Certificate
            </button>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div>
        <p>{Output}</p>
        {/* <h3>{Output.name}</h3> */}

      </div>


    </>
  )
}

export default App