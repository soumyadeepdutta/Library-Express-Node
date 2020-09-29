const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxlength:100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

AuthorSchema.virtual('lifespan').get(function() {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});
AuthorSchema.virtual('dob').get(function(){
    return this.date_of_birth ? moment(this.date_of_birth).format('YYYY.MM.DD') : ''; 
});
AuthorSchema.virtual('dod').get(function(){
    return this.date_of_death ? moment(this.date_of_death).format('YYYY.MM.DD') : '';
})

AuthorSchema.virtual('name').get(function(){
    let fullname = '';
    if(this.first_name && this.family_name){
        fullname = this.family_name +', '+this.first_name;
    }
    if (!this.first_name || !this.family_name) {
        fullname = '';
    }
    return fullname;
})

AuthorSchema.virtual('url').get(function(){
    return '/catalog/author/'+this._id;
});

module.exports = mongoose.model('Author', AuthorSchema)