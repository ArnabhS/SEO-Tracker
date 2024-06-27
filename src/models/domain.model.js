import { Schema, model, models } from "mongoose"
const domainRegex = /[a-z0-9]+\.[a-z0-9\.]+/;

const DomainSchema = new Schema({
    domain: {
        type: String,
        required:true,
        validate:val=>val.includes('.')
    },
    owner: {type:String, required: true},
    icon: {type:String},
},{timestamps:true})

export const Domain = models?.Domain || model('Domain', DomainSchema);