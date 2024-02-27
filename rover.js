class Rover {
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage = function(message) {
        let results = [];
        for (let command of message.commands) {        
            if (command.commandType === "STATUS_CHECK") {
               results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position,}})
            } else if(command.commandType === "MODE_CHANGE") { 
                  this.mode = command.value; 
                  results.push({completed: true});
            } else if (command.commandType === "MOVE") {
               if (this.mode === "NORMAL") {
                  this.position = command.value;
                  results.push({completed: true});
               } else if (this.mode === "LOW_POWER") {          
                  results.push({completed: false});
              }
            }
        }
        message = {
          message: message.name,
          results: results,
        }
      return message;        
   }  
}
module.exports = Rover; 