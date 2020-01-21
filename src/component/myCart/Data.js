let data = [
            {
                Name: [
                        { 
                            fname: [
                                {
                                    lname:"hgf",
                                    h:'d',
                                    f:'fgffg'
                                }
                            ]
                            
                        },
                        
                    ],
            }
        ]

let data1 = data.map(val => val.Name)
//console.log(data1)

let f =[]
let data2 =data1.map((val,i)=>{
    f=val[i].fname
   return f
})

let d =data2.map((val,i)=>{
    console.log(val[i].lname,val[i].h,val[i].f)
})

