const bcryp = require('bcrypt');

async function func() {
    const salt = await bcryp.genSalt(10);
    const hashed = await bcryp.hash('123', salt);
    console.log(hashed);
}

func();

