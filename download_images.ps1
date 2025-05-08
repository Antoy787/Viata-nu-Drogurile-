$imageUrls = @{
    "hero-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    "header-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    "cta-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    "info-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    "warning-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    "effects-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    "consequences-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    "help-bg.jpg" = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
}

# Create images directory if it doesn't exist
if (-not (Test-Path "images")) {
    New-Item -ItemType Directory -Path "images"
}

foreach ($image in $imageUrls.GetEnumerator()) {
    $outputPath = Join-Path "images" $image.Key
    Invoke-WebRequest -Uri $image.Value -OutFile $outputPath
    Write-Host "Downloaded $($image.Key)"
} 