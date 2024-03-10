"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormSchema } from "@/lib/schemas/post-form-schema";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { deleteObject, getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { storage } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";

export default function CreatePostPage() {
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [noImage, setNoImage] = useState(false);

    const form = useForm<z.infer<typeof PostFormSchema>>({
        resolver: zodResolver(PostFormSchema),
        defaultValues: {
            title: "",
            content: "",
            image: "",
            category: "",
        },
    });

    function onFormSubmit(values: z.infer<typeof PostFormSchema>) {
        if (!image) {
            setNoImage(true);
            return;
        }

        values.image = image;
        console.log(values);
    }

    useEffect(() => {
        if (!file) return;

        const localStorageImage = localStorage.getItem("image");

        if (localStorageImage) {
            const prevImageRef = ref(storage, localStorageImage);

            if (prevImageRef.toString()) {
                deleteObject(prevImageRef).then(() => { });
            }

            localStorage.clear();

            setImage("");
        }

        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            setProgress(percent);

        }, (error) => alert(error), () => {
            getDownloadURL(uploadTask.snapshot.ref).then(url => {
                setImage(url);
                localStorage.setItem("image", url);
                setFile(null);
            });

        });

    }, [file]);

    return (
        <Card className="shadow-none w-full border-none mt-[1rem]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <FormField
                            name="category"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Category</SelectLabel>
                                                    <SelectItem value="design">Design</SelectItem>
                                                    <SelectItem value="health">Health</SelectItem>
                                                    <SelectItem value="developement">Development</SelectItem>
                                                    <SelectItem value="accounting">Accounting</SelectItem>
                                                    <SelectItem value="others">Others</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size={"sm"} className="flex items-center gap-1 uppercase">
                            <Plus size={18} />{" "}
                            Create
                        </Button>
                    </div>
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Your blog title"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="content"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        rows={10}
                                        placeholder="Write something..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="image"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input
                                        style={{ border: noImage ? "1px solid rgb(255, 100, 100)" : "1px solid #ccc" }}
                                        onChange={(e) => {
                                            e.target.files![0] && setFile(e.target.files![0]);
                                            setNoImage(false);
                                        }}
                                        type="file"
                                    />
                                </FormControl>
                                <FormMessage children={noImage ? "Image required" : ""} />
                            </FormItem>
                        )}
                    />
                </form>
                <div className="mt-[0.5rem]">
                    {image ? (
                        <img src={image} alt="img" width={"100%"} />
                    ) : <Progress value={progress} />}
                </div>
            </Form>
        </Card>
    )
}
