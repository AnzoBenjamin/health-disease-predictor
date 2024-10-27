'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    age: z.number().min(1).max(120),
    sex: z.enum(['0', '1']),
    cp: z.enum(['0', '1', '2', '3']),
    trestbps: z.number().min(50).max(300),
    chol: z.number().min(100).max(600),
    fbs: z.enum(['0', '1']),
    restecg: z.enum(['0', '1', '2']),
    thalach: z.number().min(50).max(250),
    exang: z.enum(['0', '1']),
    oldpeak: z.number().min(0).max(10),
    slope: z.enum(['0', '1', '2']),
    ca: z.enum(['0', '1', '2', '3']),
    thal: z.enum(['1', '2', '3'])
})

export default function HeartDiseasePredictor() {
    const [prediction, setPrediction] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: undefined,
            sex: undefined,
            cp: undefined,
            trestbps: undefined,
            chol: undefined,
            fbs: undefined,
            restecg: undefined,
            thalach: undefined,
            exang: undefined,
            oldpeak: undefined,
            slope: undefined,
            ca: undefined,
            thal: undefined
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error('Prediction failed')
            }

            const data = await response.json()
            setPrediction(data.prediction)
        } catch (err) {
            console.error((err))
            setError('Failed to get prediction. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Heart Disease Prediction</CardTitle>
                    <CardDescription>
                        Enter your health indicators to get a heart disease risk prediction
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="age"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Age</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="sex"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sex</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">Male</SelectItem>
                                                    <SelectItem value="0">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Chest Pain Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="0">Typical Angina</SelectItem>
                                                    <SelectItem value="1">Atypical Angina</SelectItem>
                                                    <SelectItem value="2">Non-anginal Pain</SelectItem>
                                                    <SelectItem value="3">Asymptomatic</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="trestbps"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resting Blood Pressure (mm Hg)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="chol"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cholesterol (mg/dl)</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="fbs"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fasting Blood Sugar {'>'} 120 mg/dl</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select option" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">Yes</SelectItem>
                                                    <SelectItem value="0">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="restecg"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Resting ECG Results</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select result" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="0">Normal</SelectItem>
                                                    <SelectItem value="1">ST-T Wave Abnormality</SelectItem>
                                                    <SelectItem value="2">Left Ventricular Hypertrophy</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="thalach"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Maximum Heart Rate</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="exang"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Exercise Induced Angina</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select option" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">Yes</SelectItem>
                                                    <SelectItem value="0">No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="oldpeak"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ST Depression</FormLabel>
                                            <FormControl>
                                                <Input type="number" step="0.1" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slope"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slope of Peak Exercise ST</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="0">Upsloping</SelectItem>
                                                    <SelectItem value="1">Flat</SelectItem>
                                                    <SelectItem value="2">Downsloping</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="ca"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Number of Major Vessels</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select number" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="0">0</SelectItem>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="thal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Thalassemia</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="1">Normal</SelectItem>
                                                    <SelectItem value="2">Fixed Defect</SelectItem>
                                                    <SelectItem value="3">Reversible Defect</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Calculating...' : 'Get Prediction'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {prediction !== null && !error && (
                        <Alert>
                            <AlertDescription>
                                Based on the provided information, your likelihood of heart disease is: {prediction}%
                            </AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}