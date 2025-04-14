// src/types/canvasjs-charts.d.ts
declare module '@canvasjs/vue-charts' {
    import { DefineComponent } from 'vue';

    const CanvasJSChart: DefineComponent<{
        options: any; // You can specify the options type if you have it
    }>;

    export default CanvasJSChart;
}
