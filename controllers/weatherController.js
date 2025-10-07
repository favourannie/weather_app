const axios = require("axios")

exports.weather = async(req,res)=>{
    try {
        const {city} = req.query
        if(city === null){
            return res.status(400).json({
                message: "City name is required"
            })
        }
        const apiKey = process.env.WEATHER_SECRET

        if(apiKey === null){
            return res.status(400).json({
                message: "Api key is required"
            })
        }
        const units = "metric"
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
        const response = await axios.get(link)
        
        // console.log(response.data)
        const temperature = response.data.main.temp
        const data = {
            city: response.data.name,
            temperature: `${temperature} °C`,
            wind_speed: response.data.wind.speed,
            condition: response.data.weather[0].description
        }
        res.status(200).json({
            message: "Weather data fetched successfully",
            data: data
        })

    }
    catch (error) {
        if(error.response && error.response.status === 404){
            return res.status(404).json({
                message: "City not found"
            })
        } else if (error.response && error.response.status === 401){
            return res.status(401).json({
                message: "Invalid API key"
            })
        } else if (error.response && error.response.status === 400){
            return res.status(400).json({
                message: "Bad Request"
            })
        }
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }  
} 