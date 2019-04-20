class SamplerPlugin{
    getSamplerPlugin(){
        console.log('found Sampler plugin at: '+$('#tab-sampler'))
        return $('#tab-sampler')
    }
}
export default SamplerPlugin