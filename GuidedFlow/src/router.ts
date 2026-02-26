import { createRouter, createWebHistory } from "vue-router";
import Step1Decks from "./screens/Step1Decks.vue";
import Step2Strategy from "./screens/Step2Strategy.vue";
import Step3CorePick from "./screens/Step3CorePick.vue";
import Step4FillDeck from "./screens/Step4FillDeck.vue";
import Step5Review from "./screens/Step5Review.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/wizard/decks" },
        { path: "/wizard/decks", component: Step1Decks },
        { path: "/wizard/strategy", component: Step2Strategy },
        { path: "/wizard/core", component: Step3CorePick },
        { path: "/wizard/fill", component: Step4FillDeck },
        { path: "/wizard/review", component: Step5Review },
    ],
});