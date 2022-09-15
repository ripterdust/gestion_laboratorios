import { app } from './src/app'

// Listening
app.listen(app.get('port'), () => console.log('App running on port ' + app.get('port')))
