<template>
    <div class="mb-5">
        <div class="display-1 mt-5 mb-5 font-weight-light">Learn More</div>
        <v-card>
            <v-tabs grow slider-color="#AF372F" color="#AF372F" v-model="tabs" show-arrows>

                <v-tab class="">
                    <i class="fal fa-calendar-star mr-3"></i> Host
                </v-tab>
                <v-tab>
                    <i class="fal fa-calendar-star mr-3"></i> Gallery
                </v-tab>
                <v-tab>
                    <i class="fal fa-calendar-star mr-3"></i> Contact
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabs">
                <v-tab-item>
                    <v-card flat>
                        <v-card-title>Schedule a Pull</v-card-title>
                        <v-card-text>
                            <p>Want to schedule a pull? Fill out our <a href="#"
                                    @click.stop="schedulingForm = true">scheduling form</a> or contact Jessica Thron for
                                more information about how to bring the Gopher State Garden Tractor Pullers to your
                                community.</p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title>Check out the action</v-card-title>
                        <v-card-text>
                            <p>You don't have to be a member to pull! Our club is open to walk-ons meeting eligibility
                                requirements. See what we've been up to recently in <a href="#">our gallery</a>, or
                                check out our <a href="#">eligibility requirements.</a></p>
                            <div class='embedsocial-album' data-ref="aa139b7d7f128aeb3db328105b47cd54ece8f49e"></div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title>Learn more about tractor pulling</v-card-title>
                        <v-card-text>
                            <p>Tractor pulling is a sport for all ages! <a href="@">Contact us</a> to learn more about
                                our club. Learn more about tractor pulling in the National leagues from the National
                                Tractor Pullers Association (NTPA) here.</p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>

        <v-dialog v-model="schedulingForm" max-width="600px" overlay-color="#AF372F">
            <v-card>
                <v-card-title>
                    Scheduling Form
                </v-card-title>
                <v-card-text>
                    Some text goes here
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn>Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>
<script>
    export default {
        name: 'learnMore',
        data() {
            return {
                tabs: null,
                schedulingForm: false
            }
        },
        methods: {},
        mounted() {
            //let embedSocialScript = document.createElement('script')
            //embedSocialScript.setAttribute('src',)
        }
    }
</script>

<style scoped>
    i {
        font-size: 2em;
    }
</style>
