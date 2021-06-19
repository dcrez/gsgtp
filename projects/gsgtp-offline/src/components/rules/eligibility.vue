<template>
     <div id="rules">
        <div class="title mt-5 mb-5 font-weight-light">Eligibility
        </div>
       <ol type="a">
           <li>Contest is open to two wheel drive, rear wheel drive tractors.</li>
           <li>Drivers under the age of 18 must have a parental/guardian signed consent form on file (this is only necessary to be signed once per season) and the parent/guardian must be present at the pull. Mod Stock and Stock Altered, the minimum age is 6 yrs. old. Sports Stock and Pro Stock minimum age is 12 and Mini-Rod and Super Modified classes the minimum age is 15 yrs. old. The Open Classes minimum age is 16. In ALL classes driver must maintain control of the tractor at all times.</li>
           <li>All vehicles must pass a safety inspection by a GSGTP official annually. GSGTP inspection decal must be displayed near the kill switch on rear of the tractor. Refusal of inspection disqualifies eligibility.</li>
           <li>It is mandatory that all drivers attend any driver meetings.</li>
           <li>No vehicle may exceed 6' in width, nor shall any portion extend more than 8' in front of center of the rear axle.</li>
           <li>Judgment calls by GSGTP/event officials are final and non-appealable.</li>
           <li>Engine may not be used as a primary support structure for the vehicle. Engine may not be used as part of frame.</li>
       </ol>
     </div>
</template>
<script>
export default {
    name: 'eligibility',
    data() {
        return {

        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
ol li {
  counter-increment: my-awesome-counter;
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
}
ol li::before {
  content: "0" counter(my-awesome-counter);
  font-weight: bold;
  color: #ab372f;
  font-size: 1.25rem;
  margin-right: 0.5rem;
  line-height: 1;
}

</style>