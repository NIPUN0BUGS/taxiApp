
import { useState } from "react";

const LocationForm = () => {
    const [pickupLocation, setPickupLocation] = useState("");
    // const [dropoffLocation, setDropoffLocation] = useState("");

    // Sample locations for the dropdown
    const locations = [
        "Location A",
        "Location B",
        "Location C",
        "Location D",
        "Location E",
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., API call, state update)
        console.log("Pickup:", pickupLocation);
        // console.log("Drop-off:", dropoffLocation);
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50"> 
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mt-8 mb-6">Book Your Ride</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-4 bg-white shadow-md rounded">
                <div>
                    <label className="block text-gray-700" htmlFor="pickup">
                        Pickup Location :-
                    </label>
                    <select
                        id="pickup"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>Select your pickup location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    {/* <label className="block text-gray-700" htmlFor="dropoff">
                        Drop-off Location
                    </label> */}
                    {/* <input
                        type="text"
                        id="dropoff"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        placeholder="Enter drop-off location"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    /> */}
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Find Three-wheel
                </button>
            </form>
        </div>
    );
};

export default LocationForm;
