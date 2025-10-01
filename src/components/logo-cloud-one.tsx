import Image from "next/image";

export default function LogoCloud() {
    return (
        <section className=" w-full">
            <div className="mx-auto max-w-5xl px-6 py-8  w-fit">
                <div>
                    <p className="text-muted-foreground font-medium">Trusted by teams at :</p>
                    <div className="mt-4 flex items-center gap-12">
                        <div className="flex">
                            <Image
                                className="mx-auto h-5 w-fit"
                                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                alt="Nvidia Logo"
                                height="20"
                                width={80}
                            />
                        </div>

                        <div className="flex">
                            <Image
                                className="mx-auto h-4 w-fit"
                                src="https://html.tailus.io/blocks/customers/column.svg"
                                alt="Column Logo"
                                height="16"
                                width={80}
                            />
                        </div>
                        <div className="flex">
                            <Image
                                className="mx-auto h-4 w-fit"
                                src="https://html.tailus.io/blocks/customers/github.svg"
                                alt="GitHub Logo"
                                height="16"
                                width={80}
                            />
                        </div>
                        <div className="flex">
                            <Image
                                className="mx-auto h-5 w-fit"
                                src="https://html.tailus.io/blocks/customers/nike.svg"
                                alt="Nike Logo"
                                height="20"
                                width={80}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
