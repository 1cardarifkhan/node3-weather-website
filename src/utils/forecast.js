const request = require('request')

const forecast =(latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/547325845b4daf031a6c15324e666df4/' + latitude + ','+ longitude

    //console.log('URL:'+ url)
    request({ url , json: true}, (error, {body}) => {
        // const data = JSON.parse(response.body)
        // console.log(data.currently)
        //console.log(response.body.hourly)
        if (error) {
            callback('Unable to connecrt to weather service',undefined)
        } else if (body.error) {
            callback(undefined,'Unable to find location')
        } else {
            //console.log(response.body.daily.data[0].summary + ' It is currently '+ response.body.currently.temperature + ' degrees out. There is a '+ response.body.currently.precipProbability + ' chance of rain.')
            //console.log('Summary'+ response.body.currently.summary)
            callback(undefined, {
                summary: body.daily.data[0].summary + '. It is currently '+ body.daily.data[0].temperatureHigh + ' degrees out. There is a '+ body.daily.data[0].precipProbability + '% chance of rain.'+ 'The apparent max temp  '+ body.daily.data[0].apparentTemperatureMax,
                temperature: body.daily.data[0].temperatureHigh,
                precipProbability: body.daily.data[0].precipProbability
            })
        }
    })
}

module.exports = forecast