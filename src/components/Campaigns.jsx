import React, {useState} from 'react'
import './Campaigns.css'
import EmailPreview from './EmailPreview'
import recipientLists from '../data/recipientLists.json';
import emailTemplates from '../data/emailTemplates.json';



function Campaigns() {

    const initialCampaign = {
        sender: "",
        subject: "",
        template: "",
        dateTime: [],
        recipients: []
    }
    
    const [campaignsData, setCampaignsData] = useState([]);
    // currently selected campaign -- used in every onChange event handler as a parameter for handleChange function
    const [selectedCampaignIndex, setSelectedCampaignIndex] = useState(0)
    const [timeDateField, setTimeDateField] = useState({
        date: "",
        time: ""
    })
    const [recipientData, setRecipientData] = useState(recipientLists.lists);
    const [emailTemplatesData, setEmailTemplatesData] = useState(emailTemplates.emails);
    // selects the email template from emailTemplatesData
    const selectedTemplateId = campaignsData[selectedCampaignIndex]?.template;
    const selectedTemplate = emailTemplatesData.find(template => template.id === selectedTemplateId);

    function handleChange(event, index) {
        const {name, value} = event.target
        
        console.log("Campaigns Data", campaignsData);

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
                const updatedCampaignsData = [...prevCampaignsData];
                updatedCampaignsData[selectedCampaignIndex] = {
                    ...updatedCampaignsData[selectedCampaignIndex],
                    dateTime: [
                        ...updatedCampaignsData[selectedCampaignIndex].dateTime,
                        {
                            date: timeDateField.date,
                            time:timeDateField.time,
                        },
                    ],
                }
                return updatedCampaignsData
            })
        }
    }

    const handleCheckboxChange = (listId) => {
        setCampaignsData((prevCampaignsData) => {
            return prevCampaignsData.map((campaign, index) => {
                if (index === selectedCampaignIndex) {
                    const updatedRecipients = campaign.recipients.includes(listId)
                        ? campaign.recipients.filter(id => id !== listId)
                        : [...campaign.recipients, listId];
    
                    return {
                        ...campaign,
                        recipients: updatedRecipients
                    };
                }
                return campaign;
            });
        });
    };
    

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
                <button className='newCampaign--button' onClick={handleNewCampaign}>New Campaign +</button>
                <div className='campaignsList'>
                    {campaignsData.map((campaign, index) =>
                        <div 
                            key={index} 
                            className={`campaignItem ${selectedCampaignIndex === index ? 'selected' : ''}`}
                            onClick={() => handleCampaignClick(index)}
                        >
                            <div className={`campaignItem--title ${selectedCampaignIndex === index ? 'selected' : ''}`}>
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
                            className='inputField'
                            type='email'
                            name='sender'
                            value={campaignsData[selectedCampaignIndex]?.sender}
                            onChange={(event) => handleChange(event, selectedCampaignIndex)} />
                        <h4 className='columnOne--header header'>Subject Line</h4>
                        <input
                            className='inputField'
                            type='text'
                            name='subject'
                            value={campaignsData[selectedCampaignIndex]?.subject}
                            onChange={(event) => handleChange(event, selectedCampaignIndex)} />
                        <h4 className='columnOne--header header'>Template Selection</h4>
                        <select
                            className='selectTemplate'
                            name='template'
                            value={campaignsData[selectedCampaignIndex]?.template}
                            onChange={(event) => handleChange(event, selectedCampaignIndex)}
                        >
                            <option value="">--Choose a template--</option>
                            {emailTemplatesData.map((template) => (
                                <option key={template.id} value={template.id}>
                                    {template.templateName}
                                </option>
                            ))}
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
                                <button className='timeButton' onClick={handleAddTimeDate}>+</button>
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
                                                    checked={campaignsData[selectedCampaignIndex]?.recipients.includes(list.id)}
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
                    </div>
                <div className='campaigns--columnTwo'>
                    <h2>Email Preview</h2>
                    <EmailPreview selectedTemplate={selectedTemplate} />
                </div></>
            )}
        </main>
    )
}

export default Campaigns