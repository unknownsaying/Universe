
// 1. short - typically 16 bits
static short kernel_short = -32768;  // Minimum value for signed short

// 2. int - typically 32 bits in kernel space
static int kernel_int = 2147483647;  // Maximum value for signed int

// 3. float - single precision floating point (rare in kernel)
static float kernel_float = 3.1415926f;

// 4. double - double precision floating point (also rare in kernel)
static double kernel_double = 2.718281828459045;

// 5. long - size depends on architecture (32/64-bit)
static long kernel_long = -9223372036854775807L;  // Near minimum for 64-bit

// 6. signed - explicitly signed version of types
static signed char kernel_schar = -128;
static signed int kernel_sint = -1;

// 7. unsigned - explicitly unsigned version of types
static unsigned short kernel_ushort = 65535;  // Maximum for unsigned short
static unsigned int kernel_uint = 4294967295U;  // Maximum for unsigned int
static unsigned long kernel_ulong = 18446744073709551615UL;  // Max for 64-bit

// Function to demonstrate type usage
static void demonstrate_types(void)
{
    // 1. short operations
    pr_info("Short value: %hd, size: %zu bytes\n", 
            kernel_short, sizeof(kernel_short));
    
    // 2. int operations
    pr_info("Int value: %d, size: %zu bytes\n", 
            kernel_int, sizeof(kernel_int));
    
    // 3. float operations (rare in kernel)
    pr_info("Float value: %.6f, size: %zu bytes\n", 
            kernel_float, sizeof(kernel_float));
    
    // 4. double operations (also rare in kernel)
    pr_info("Double value: %.15lf, size: %zu bytes\n", 
            kernel_double, sizeof(kernel_double));
    
    // 5. long operations
    pr_info("Long value: %ld, size: %zu bytes\n", 
            kernel_long, sizeof(kernel_long));
    
    // 6. signed operations
    pr_info("Signed char: %d, Signed int: %d\n", 
            kernel_schar, kernel_sint);
    
    // 7. unsigned operations
    pr_info("Unsigned short: %hu, Unsigned int: %u, Unsigned long: %lu\n",
            kernel_ushort, kernel_uint, kernel_ulong);
    
    // Type conversion example
    unsigned int converted = (unsigned int)kernel_int;
    pr_info("Converted int to unsigned: %u\n", converted);
}

// Module initialization
static int type_demo_init(void)
{
    pr_info("Type Demonstration Module Loaded\n");
    demonstrate_types();
    return 0;
}

// Module cleanup
static void type_demo_exit(void)
{
    pr_info("Type Demonstration Module Unloaded\n");
}
module_init(type_demo_init);
module_exit(type_demo_exit);