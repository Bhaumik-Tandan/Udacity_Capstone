import React,{useState} from 'react'
import "./form.css";
import Multiselect from 'multiselect-react-dropdown';
import {restCon} from "./restCon";
import Loading from './loading/loading';
import Rating from './rating/rating';
const cuisines=require('./cuisines.json')['list'];
function Form() {

    const [selectedCuisines,setSelectedCuisines]=useState([]);
    const [model,setModel]=useState("random_forest");
    const [hasTableBooking,setHasTableBooking]=useState("1");
    const [hasOnlineDelivery,setHasOnlineDelivery]=useState("1");
    const [isDeliveringNow,setIsDeliveringNow]=useState("1");
    const [switchToOrderMenu,setSwitchToOrderMenu]=useState("1");
    const [status,setStatus]=useState(1);//0 for loading,1 for form,2 for result
    const [rating,setRating]=useState(0);

    async function submit(event)
    {
        setStatus(0);
        event.preventDefault();

        const payload={
            "cuisines":[],
            "model":model=="random_forest"?0:1,
            "has_table_booking":hasTableBooking=="1"?1:0,
            "has_online_delivery":hasOnlineDelivery=="1"?1:0,
            "is_delivering_now":isDeliveringNow=="1"?1:0,
            "switch_to_order_menu":switchToOrderMenu=="1"?1:0,
            "longitude":parseFloat(event['target']['elements']["longitude"]['value']),
            "latitude":parseFloat(event['target']['elements']["latitude"]['value']),
            "average_cost_for_two":parseInt(event.target.elements[3].value),
            "price_range":parseInt(event.target.elements[8].value),
            "votes":parseInt(event['target']['elements']["votes"]['value'])
        }

        for(let i=0;i<selectedCuisines.length;i++)
            payload['cuisines'].push(selectedCuisines[i]['name']);

        const res=await restCon(payload);     
        const body=await res.json();
        console.log(body);
        setRating(body['rating']);
        setStatus(2);
    }

    return (
        <>
        {status===0?<Loading text="Getting Rating" />:status===1?
        <form className="form"  onSubmit={submit} >

            <label>Model</label>
            <select name="model" onChange={(e)=>setModel(e.value)}>
            <option value="random_forest">Random Forest</option>
            <option value="knn">K-NN</option>
            </select>


            <label>Longitude</label>
            <input type="number" name="longitude"  min="-180" max="180" required/>

            <label>Latitude</label>
            <input type="number" name="latitude"  min="-90" max="90" required/>

            <label>Average Cost For Two</label>
            <input type="number" name="averageCostForTwo" min="0" required />

            <label>Has Table Booking</label>
            <select name="hasTableBooking" onChange={(e)=>setHasTableBooking(e.value)} >
            <option value="1">Yes</option>
            <option value="0">No</option>
            </select>

            <label>Has Online Delivery</label>
            <select name="hasOnlineDelivery" onChange={(e)=>{setHasOnlineDelivery(e.value)}} >
            <option value="1">Yes</option>
            <option value="0">No</option>
            </select>

            <label>Is Delivering Now</label>
            <select name="isDeliveringNow" onChange={(e)=>setIsDeliveringNow(e.value)}>
            <option value="1">Yes</option>
            <option value="0">No</option>
            </select>

            <label>Switch To Order Menu</label>
            <select name="switchToOrderMenu" onChange={(e)=>setSwitchToOrderMenu(e.value)}>
            <option value="1">Yes</option>
            <option value="0">No</option>
            </select>

            <label>Price Range</label>
            <input type="number" name="priceRange"  min="0" required />

            <label>Votes</label>
            <input type="number" name="votes"  min="0" required />


            <label>Cuisines</label>
            <Multiselect 
            onSelect={(selectedList)=>setSelectedCuisines(selectedList)} 
            onRemove={(selectedList)=>setSelectedCuisines(selectedList)}
            name="cuisines" options={cuisines} displayValue="name" 
            />

        
            
            <input type="submit" value="Submit" />

        </form>:
        <div className="result">
            <button onClick={()=>setStatus(1)}>Go Back</button>
            <Rating rating={rating} />
        </div>
        }
        </>
    )
}

export default Form;