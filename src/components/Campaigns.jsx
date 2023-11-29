import React, {useState} from 'react'
import './Campaigns.css'
import recipientLists from '../data/recipientLists.json';



function Campaigns() {

    const initialCampaign = {
        sender: "",
        subject: "",
        template: "",
        dateTime: [],
        recipients: ""
    }
    
    const [campaignsData, setCampaignsData] = useState([]);
    const [selectedCampaignIndex, setSelectedCampaignIndex] = useState(0)
    const [timeDateField, setTimeDateField] = useState({
        date: "",
        time: ""
    })
    const [recipientData, setRecipientData] = useState(recipientLists.lists);
    const [selectedLists, setSelectedLists] = useState([]);

    function handleChange(event, index) {
        const {name, value} = event.target
        setCampaignsData(prevCampaignsData => {
            let updatedCampaignsData = [...prevCampaignsData]
            updatedCampaignsData[index] = {
            ...updatedCampaignsData[index],
            [name]: value
            }
            return updatedCampaignsData
        })
    }

    function handleTimeDateChange(event) {
        const {name, value} = event.target
        setTimeDateField(prevTimeDateField => ({
            ...prevTimeDateField,
            [name]: value
        }));
    }

    function handleAddTimeDate() {
        if (timeDateField.date && timeDateField.time) {
            setCampaignsData((prevCampaignsData) => {
                const updatedCampaignsData = [...prevCampaignsData]
                updatedCampaignsData[selectedCampaignIndex].dateTime.push({
                    date: timeDateField.date,
                    time: timeDateField.time
                })
                return updatedCampaignsData
            })
        }
    }

    const handleCheckboxChange = (listId) => {
        setSelectedLists((prevSelectedLists) => {
            if (prevSelectedLists.includes(listId)) {
                return prevSelectedLists.filter((id) => id !== listId)
            }   else {
                return [...prevSelectedLists, listId]
            }
        })
    }

    function handleNewCampaign() {
        setCampaignsData((prevCampaignsData) => {
            return [...prevCampaignsData, initialCampaign]
        })
    }

    function handleDeleteCampaign(index) {
        setCampaignsData((prevCampaignsData) => {
            const updatedCampaignsData = [...prevCampaignsData]
            updatedCampaignsData.splice(index, 1)
            return updatedCampaignsData
        })
    }

    function handleCampaignClick(index) {
        setSelectedCampaignIndex(index)
    }

    return (
        <main className='campaigns--container'>
            <div className='campaignsColumn'>
                <h4 className='campaignsList--header header'>Active Campaigns</h4>
                <button className='newCampaign--button' onClick={handleNewCampaign}>New Campaign+</button>
                <div className='campaignsList'>
                    {campaignsData.map((campaign, index) =>
                        <div 
                            key={index} 
                            className='campaignItem'
                            onClick={() => handleCampaignClick(index)}
                        >
                            <div className='campaignItem--title'>
                                <p>Campaign {index+1}</p>
                            </div>
                            <div className='deleteButton' onClick={() => handleDeleteCampaign(index)}>
                                <p>X</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {campaignsData.length === 0 ? (
                <div className='conditionalMessage'>
                    <p>Please click New Campaign button to get started!</p>
                </div>
            ) : (
            <><div className='campaigns--columnOne'>
                        <h2 className='header'>Campaign {selectedCampaignIndex + 1}</h2>
                        <h4 className='columnOne--header header'>Sender Email</h4>
                        <input
                            type='email'
                            name='sender'
                            value={campaignsData[selectedCampaignIndex]?.sender}
                            onChange={(event) => handleChange(event, selectedCampaignIndex)} />
                        <h4 className='columnOne--header header'>Subject Line</h4>
                        <input
                            type='text'
                            name='subject'
                            value={campaignsData[selectedCampaignIndex]?.subject}
                            onChange={(event) => handleChange(event, selectedCampaignIndex)} />
                        <h4 className='columnOne--header header'>Template Selection</h4>
                        <select
                            name='template'
                            value={campaignsData[selectedCampaignIndex]?.template}
                            onChange={(event) => handleChange(event, selectedCampaignIndex)}
                        >
                            <option>option 1</option>
                            <option>option 2</option>
                        </select>
                        <div className='timesAndRecipients'>
                            <div className='times'>
                                <h4 className='columnOne--header header'>Schedule Times</h4>
                                <span>Date:</span><input
                                    type='date'
                                    name='date'
                                    value={timeDateField.date}
                                    onChange={handleTimeDateChange} /><br />
                                <span>Time:</span><input
                                    type='time'
                                    name='time'
                                    value={timeDateField.time}
                                    onChange={handleTimeDateChange} />
                                <button onClick={handleAddTimeDate}>+</button>
                                <div className='timesList'>
                                    {campaignsData[selectedCampaignIndex]?.dateTime.map((dateTime, index) => <div
                                        className='timeDate--item'
                                        key={index}
                                    >
                                        <p>{dateTime.date} @ {dateTime.time}{dateTime.time.split(':')[0] >= 12 ? 'PM' : 'AM'}</p>
                                    </div>
                                    )}

                                </div>
                            </div>
                            <div className='recipients'>
                                <h4 className='columnOne--header header'>Recipient Lists</h4>
                                <form>
                                    {recipientData.map((list) =>
                                        <div key={list.id}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value={list.id}
                                                    checked={selectedLists.includes(list.id)}
                                                    onChange={() => handleCheckboxChange(list.id)}
                                                />
                                                {list.name}
                                            </label>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                        <div className='buttonsContainer'>
                            <button className='button1'>Activate</button><button className='button2'>Save as Draft</button>
                        </div>
                        <button className='button3'>Force Send</button>
                    </div><div className='campaigns--columnTwo'>
                </div></>
            )}
        </main>
    )
}

export default Campaigns