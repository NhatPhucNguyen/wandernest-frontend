const SmoothScrollLink = ({
    href,
    className,
    children,
}: {
    href: string;
    className: string;
    children: React.ReactNode;
}) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (href.startsWith("#")) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth",
                });

                window.history.pushState(null, "", href);
            }
        } else {
            // For non-hash links, use regular navigation
            window.location.href = href;
        }
    };

    return (
        <a href={href} className={className} onClick={handleClick}>
            {children}
        </a>
    );
};
export default SmoothScrollLink;
