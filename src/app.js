const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')



//console.log(__dirname)
//console.log(path.join(__dirname,'../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname, '../template/views')

const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Arif Khan'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Arif Khan'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help me',
        helptext: 'This is some text to help you',
        name: 'Arif Khan'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provided Address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location}= {})=>{
        if (error) {
            return res.send({
                error: error
            })
        }
            console.log('atitude: '+ latitude)
            forecast(latitude, longitude,(error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
    
        //console.log('Error:',error)
        //console.log('Data: ', data)
       
        })
})


app.get('/products',(req,res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    console.log("Search string value: "+req.query.search)

    res.send({
        products:[]
    })
})
app.get('/help/*',(req, res)=>{
    res.render('Err404',{
        title: '404',
        name: 'Arif Khan',
        errorText: 'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('Err404',{
        title: '404',
        name: 'Arif Khan',
        errorText:'My 404 Page'
    })

})

//app.com
//app.com/help
//app.com/about

app.listen(3000,()=> {
    console.log('Server is up on port 3000')
})
