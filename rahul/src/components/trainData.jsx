const trainData = [
    {
        number: "12345",
        name: "Mumbai Express",
        from: "Mumbai Central",
        to: "Delhi Cantonment",
        depTime: "06:00 AM", 
        arrTime: "02:30 PM",
        duration: "8.5h",
        days: ["Mon", "Wed", "Fri"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "WL"},
            {type: "AC", status: "RLWL"}
        ]
    },
    {
        number: "12346",
        name: "Rajdhani Express",
        from: "New Delhi",
        to: "Kolkata",
        depTime: "05:30 PM",
        arrTime: "06:00 AM",
        duration: "12.5h",
        days: ["Tue", "Thu", "Sat"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "WL"}
        ]
    },
    {
        number: "12347",
        name: "Deccan Queen",
        from: "Mumbai CST",
        to: "Pune Junction",
        depTime: "05:10 AM",
        arrTime: "08:30 AM", 
        duration: "3.5h",
        days: ["Daily"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12348",
        name: "Howrah Mail",
        from: "Kolkata",
        to: "Chennai Central",
        depTime: "09:45 PM",
        arrTime: "03:15 PM",
        duration: "17.5h",
        days: ["Mon", "Wed", "Sat"],
        classes: [
            {type: "SL", status: "WL"},
            {type: "GEN", status: "RLWL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12349",
        name: "Shatabdi Express",
        from: "Chennai Central",
        to: "Bengaluru",
        depTime: "06:30 AM",
        arrTime: "11:00 AM",
        duration: "4.5h",
        days: ["Daily"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12350",
        name: "Konkan Railway",
        from: "Mangalore",
        to: "Mumbai CST",
        depTime: "08:15 PM",
        arrTime: "06:45 AM",
        duration: "10.5h",
        days: ["Tue", "Fri"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "WL"},
            {type: "AC", status: "RLWL"}
        ]
    },
    {
        number: "12351",
        name: "Gatimaan Express",
        from: "Delhi",
        to: "Agra",
        depTime: "07:00 AM",
        arrTime: "08:30 AM",
        duration: "1.5h",
        days: ["Daily"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12352",
        name: "Coromandel Express",
        from: "Chennai Central",
        to: "Kolkata",
        depTime: "11:30 PM",
        arrTime: "02:15 PM",
        duration: "14.75h",
        days: ["Mon", "Thu", "Sat"],
        classes: [
            {type: "SL", status: "WL"},
            {type: "GEN", status: "RLWL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12353",
        name: "Duronto Express",
        from: "Pune Junction",
        to: "Patna",
        depTime: "04:45 PM",
        arrTime: "05:30 AM",
        duration: "12.75h",
        days: ["Wed", "Sat"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "WL"},
            {type: "AC", status: "RLWL"}
        ]
    },
    {
        number: "12354",
        name: "Kerala Express",
        from: "Delhi",
        to: "Thiruvananthapuram",
        depTime: "10:15 PM",
        arrTime: "04:45 PM",
        duration: "16.5h",
        days: ["Tue", "Fri"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "WL"}
        ]
    },
    {
        number: "12355",
        name: "Superfast Express",
        from: "Ahmedabad",
        to: "Jaipur",
        depTime: "07:45 PM",
        arrTime: "05:30 AM",
        duration: "9.75h",
        days: ["Mon", "Wed", "Sat"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "WL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12356",
        name: "Humsafar Express",
        from: "Patna",
        to: "Bengaluru",
        depTime: "09:15 PM",
        arrTime: "02:45 PM",
        duration: "17.5h",
        days: ["Tue", "Thu", "Sun"],
        classes: [
            {type: "SL", status: "WL"},
            {type: "GEN", status: "RLWL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12357",
        name: "Tejas Express",
        from: "Mumbai Central",
        to: "Goa",
        depTime: "06:30 AM",
        arrTime: "02:15 PM",
        duration: "7.75h",
        days: ["Daily"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12358",
        name: "Malabar Express",
        from: "Chennai Central",
        to: "Kochi",
        depTime: "08:45 PM",
        arrTime: "06:30 AM",
        duration: "9.75h",
        days: ["Mon", "Wed", "Fri"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "WL"},
            {type: "AC", status: "RLWL"}
        ]
    },
    {
        number: "12359",
        name: "Jammu Tawi Express",
        from: "Delhi",
        to: "Jammu Tawi",
        depTime: "05:15 PM",
        arrTime: "05:00 AM",
        duration: "11.75h",
        days: ["Tue", "Thu", "Sat"],
        classes: [
            {type: "SL", status: "WL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12360",
        name: "Gitanjali Express",
        from: "Mumbai CST",
        to: "Patna",
        depTime: "10:30 PM",
        arrTime: "02:45 PM",
        duration: "16.25h",
        days: ["Mon", "Wed", "Sat"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "RLWL"},
            {type: "AC", status: "WL"}
        ]
    },
    {
        number: "12361",
        name: "Tapovan Express",
        from: "Pune Junction",
        to: "Ahmedabad",
        depTime: "07:00 AM",
        arrTime: "03:30 PM",
        duration: "8.5h",
        days: ["Tue", "Thu", "Sun"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "RLWL"}
        ]
    },
    {
        number: "12362",
        name: "Sanghamitra Express",
        from: "Bengaluru",
        to: "Patna",
        depTime: "08:15 PM",
        arrTime: "06:45 AM",
        duration: "10.5h",
        days: ["Wed", "Fri", "Sun"],
        classes: [
            {type: "SL", status: "WL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12363",
        name: "Jaipur Express",
        from: "Delhi",
        to: "Jaipur",
        depTime: "06:45 AM",
        arrTime: "11:30 AM",
        duration: "4.75h",
        days: ["Daily"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "AVL"},
            {type: "AC", status: "AVL"}
        ]
    },
    {
        number: "12364",
        name: "Kochi Express",
        from: "Chennai Central",
        to: "Kochi",
        depTime: "09:30 PM",
        arrTime: "07:15 AM",
        duration: "9.75h",
        days: ["Tue", "Thu", "Sat"],
        classes: [
            {type: "SL", status: "AVL"},
            {type: "GEN", status: "WL"},
            {type: "AC", status: "RLWL"}
        ]
    }
];
export default trainData;