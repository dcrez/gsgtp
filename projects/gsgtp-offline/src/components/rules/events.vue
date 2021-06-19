<template>
     <div id="events">
        <div class="title mt-5 mb-5 font-weight-light">Event Rules and Procedures
        </div> 
       <ol type="a">
           <li><div class="subtitle-1 font-weight-medium">Entry</div>
           <ol>
                      <li>Scratching from a class previous to its start shall constitute a refund of entry fee. If tractor hooks to sled no refunds allowed.</li>
           <li>Pulling position will be determined by a random drawing at the time of contest entry.</li>
          </ol>
          </li>
          </ol>
        <div class="subtitle-1 font-weight-medium">Vehicle Operations</div> 
       <ol type="a">
           <li>Scratching from a class previous to its start shall constitute a refund of entry fee. If tractor hooks to sled no refunds allowed.</li>
           <li>Pulling position will be determined by a random drawing at the time of contest entry.</li>
          </ol>
     </div>
</template>
<script>
export default {
    name: 'events',
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