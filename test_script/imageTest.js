const ops = [
      {
        insert: "Hello World! "
      },
      {
        insert: {
          image: "data:image/png;base64,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"
        }
      },
      {
        insert: "\n\n"
      }
    ]

const fs = require('fs');


for(i = 0; i < ops.length; i++){    
    
    if(ops[i].insert.image){
        let base64String = ops[i].insert.image;
        let base64Image = base64String.split(';base64,').pop();

        fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
            console.log('File created');
        })
    }    
}
